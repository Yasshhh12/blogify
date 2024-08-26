const path = require('path');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const mongoose = require('mongoose');
const createTokenForUser = require('./services/authentication.js')
const cookieparser = require('cookie-parser')
mongoose.connect('mongodb://127.0.0.1:27017/blog').then(e=>console.log('MongoDB connected'));
const User = require('./models/user'); 
const Blog = require('./models/blog');


const express = require('express');
const { checkForAuthenticationCookie } = require('./middlewares/authentication.js');
const app = express();
const PORT = 8000;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find({});
    res.render('home',{
        user:req.user,
        blogs:allBlogs
    });
});

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));

