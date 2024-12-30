const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL,{
    dbName:process.env.DB_Name
}).then(
    ()=>{
        console.log('Connected to Database')
    }
).catch((err)=>{
    console.log('Error connecting to database '+err)
})
