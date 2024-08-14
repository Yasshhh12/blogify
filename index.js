const path = require('path');
const userRoute = require('./routes/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blog').then(e=>console.log('MongoDB connected'));

const express = require('express');
const app = express();
const PORT = 8000;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.render('home');
});

app.use('/user',userRoute);

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));

