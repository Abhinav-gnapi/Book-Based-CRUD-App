const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();

exports.registerUser = async (req,res) => {
    try {
        const {email, password} = req.body;
        bcrypt.hash(password, 10)
        .then(hash => {
            User.create({email, password: hash})
            .then(user => res.json(user))
            .catch(err => res.json(err.message))
            // res.status(200).json(user)
        })
        .catch(err => res.json(err.message))
    } catch (error) {
    res.status(400).json({
      statusCode: res.statusCode,
      errorMsg: error.message
    });
  }
}

exports.loginUser = async (req, res) => {
    try {
    const {email, password} = req.body;
    if(email && password){
        User.findOne({email: email})
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password, (err, response) => {
                    if(response){
                        const token = jwt.sign({email: user.email}, process.env.JWT_KEY, {expiresIn: "1d"})
                        res.cookie("token", token);
                        res.json("Success")
                    }
                    else{
                       res.json("Password is incorrect!");
                    }
                })
            } else {
                res.json("Entry is not exists! please register..")
            }
        })
        .catch(err => res.json(err))
    } else if(!email && !password){
        res.json("Enter email and password!")
    } else if(!email){
        res.json("Enter email!")
    } else {
        res.json("Enter password!")
    }
    }catch (error) {
        res.status(400).json({
        statusCode: res.statusCode,
        errorMsg: error.message
        });
    }
}