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

router.post('/signin',async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.matchPassword(email,password);

    console.log('User',user);
    return 

})

router.post('/signup',async(req,res)=>{
    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password,
    });
    res.redirect('/');
    
})


module.exports = router ;