const {Router} = require('express');
const userRoute = require('../routes/user');
const User = require('../models/user'); 
const router = Router();

router.get("/signin",(req,res)=>{
    return res.render('signin');
});


router.get("/signup",(req,res)=>{
    return res.render('signup');
});

router.post('/signup',async(req,res)=>{
    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect('/');
})


module.exports = router ;