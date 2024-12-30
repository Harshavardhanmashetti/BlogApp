const express = require('express')
const app = express();

const bodyParser = require('body-parser');
const PORT = 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/Auth');
const blogRoutes = require('./Routes/Blog');
const imageUploadRoutes=require('./Routes/imageUploadRoutes')


require('dotenv').config();
require('./db')
const User = require('./Models/UserSchema')
const Blog = require('./Models/BlogSchema')
const allowedOrigins=['http://localhost:3000'];//add more origins if needed
//configure cors with credentials
app.use(cors(
    {
        origin:function(origin,callback){
            if(!origin||allowedOrigins.includes(origin)){
                callback(null,true);
            }
            else{
                callback(new Error('Not allowed by cors'));
            }
        },credentials:true//Allow credentials
    }
))
app.use(cookieParser());
app.use(bodyParser.json())


app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);
app.use('/image',imageUploadRoutes);

app.get('/', (req, res) => {
    res.json({ message: "The API is working" });
})

app.get('/blogcategories', async (req, res) => {
    const blogCategories = [
        "Fashion",
"Beauty",
"Travel",
"Lifestyle",
"Personal",
"Tech",
"Health",
"Fitness",
"Wellness",
"SaaS",
"Business",
"Education",
"Food and Recipe", 
"Love and Relationships",
"Alternative topics",
"Green living",
"Music",
"Automotive",
"Marketing",
"Internet services"
    ]
    res.json({
        message:"Categories fetched successfully",
        categories:blogCategories
    })
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})