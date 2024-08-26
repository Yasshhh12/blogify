
const {validateToken} = require('../services/authentication');

function checkForAuthenticationCookie(cookieName){
    return  (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];

        if(!tokenCookieValue){
           return next();
        }

        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user=userPayload;
        }
        catch (err) {  
            console.error('Error validating token:', err.message); 
            res.status(401).send('Invalid token');
        }
        return next();
    }
}

module.exports={
    checkForAuthenticationCookie
};