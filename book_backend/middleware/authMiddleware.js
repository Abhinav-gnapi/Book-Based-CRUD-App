const jwt = require('jsonwebtoken')
require("dotenv").config();

exports.verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json("Token was not available!")
    } else {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(err) return res.json("Token is wrong");
            req.user = decoded;
            next();
        })
    }
}