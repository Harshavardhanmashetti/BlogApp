const express=require('express')
const router=express.Router();
const User=require('../Models/UserSchema');
const errorHandler=require('../Middlewares/errorMiddleware');
const authTokenHandler=require('../Middlewares/checkAuthToken');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const nodemailer=require('nodemailer');
require('dotenv').config();

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'vardhanmashettiharsha@gmail.com',
        pass:'jljdycflvuswigfg'
    }
})
router.get('/test',async (req,res)=>{
    res.json({
        message:"User api is Working"
    })
})
function createResponse(ok,message,data){
    return{
        ok,
        message,
        data
    };
}
router.post('/sendotp',async(req,res,next)=>{
    const {email}=req.body;
    const otp=Math.floor(100000+Math.random()*900000);
    try{
        const mailOptions={
            from:process.env.COMPANY_EMAIL,
            to: email,
            subject:'OTP for verification of BlogApp',
            text:`Your OTP for verification is ${otp}`
        }
        transporter.sendMail(mailOptions,async(err,info)=>{
            if(err){
                console.log(err);
                res.status(500).json(
                    createResponse(false,err.message)
                );
            }
            else{
                console.log(otp);
                res.json(createResponse(true,'OTP sent successfully',{otp}));
            }
        })
    }
    catch(err){
        next(err);
    }
})
router.post('/register',async(req,res,next)=>{
    try{
        const {email,password,name}=req.body;
        const existingUser=await User.findOne({email:email})

        if(existingUser){
            return res.status(409).json(createResponse(false,"E-mail already exists"));
        }
        const newUser=new User({
            name,
            password,
            email
        })

        newUser.save();

        res.status(201).json(createResponse(true,"User Registered SuccessFully",newUser));

    }
    catch(err){
        next(err);
    }
})
router.post('/login',async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json(createResponse(false,"Invalid Email"));
        }
        
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json(createResponse(false,"Invalid Email OR Password"));
        }

        const authToken=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'10m'});
        const refreshToken=jwt.sign({userId:user._id},process.env.JWT_REFRESH_SECRET_KEY,{expiresIn:'40m'});

        res.cookie('authToken',authToken,{httpOnly:true});
        res.cookie('refreshToken',refreshToken,{httpOnly:true});
        res.status(200).json(createResponse(true,"Login successfully"));
    }
    catch(err){
        next(err);
    }
})
router.get('/checklogin',authTokenHandler,async(req,res)=>{
    res.json({
        ok:true,
        message:"User authenticated successfully"
    })
})
router.use(errorHandler);
module.exports=router;