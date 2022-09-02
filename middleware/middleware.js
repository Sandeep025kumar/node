const jwt  = require('jsonwebtoken');
const validation = (req,res,next)=>{
    const token = req.cookies.sample_cookie;
    if(!token) return res.json("Token Not Found")
    jwt.verify(token,process.env.TOKENKEY, (err,data)=>{
        if(err) return res.json("Authentication Failed")
        req.data = data;
        next()
    })


}
module.exports = validation;