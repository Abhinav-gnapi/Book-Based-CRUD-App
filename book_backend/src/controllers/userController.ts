// const User = require('../models/userModel')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// require("dotenv").config();

// exports.registerUser = async (req,res) => {
//     try {
//         const {email, password} = req.body;
//         const existUser = await User.findOne({email})
//         if(existUser){
//             res.json("User already exists..please login!")
//         }
//         bcrypt.hash(password, 10)
//         .then(hash => {
//             User.create({
//                 email,
//                 password: hash,
//             })
//             .then(user => res.json(user))
//             .catch(err => res.json(err.message))
//             // res.status(200).json(user)
//         })
//         .catch(err => res.json(err.message))
//     } catch (error) {
//     res.status(400).json({
//       statusCode: res.statusCode,
//       errorMsg: error.message
//     });
//   }
// }

// exports.loginUser = async (req, res) => {
//     try {
//     const {email, password} = req.body;
//     if(email && password){
//         User.findOne({email: email})
//         .then(user => {
//             if(user){
//                 bcrypt.compare(password, user.password, (err, response) => {
//                     if(response){
//                         const token = jwt.sign({email: user.email, role: user.role}, process.env.JWT_KEY, {expiresIn: "1d"})
//                         res.cookie("token", token, {httpOnly: true});
//                         res.json({user: {
//                             success: true,
//                             email: user.email,
//                             role: user.role
//                         }})
//                     }
//                     else{
//                        res.json("Password is incorrect!");
//                     }
//                 })
//             } else {
//                 res.json("User not exists! please register..")
//             }
//         })
//         .catch(err => res.json(err))
//     } else if(!email && !password){
//         res.json("Enter email and password!")
//     } else if(!email){
//         res.json("Enter email!")
//     } else {
//         res.json("Enter password!")
//     }
//     }catch (error) {
//         res.status(400).json({
//         statusCode: res.statusCode,
//         errorMsg: error.message
//         });
//     }
// }

// exports.logoutUser = async (req, res) => {
//     try {
//         // res.clearCookie('token');
//         // res.status(200).json({message:"Logout Successfully!"})
//         res.cookie("token", "", {
//         httpOnly: true,
//         expires: new Date(0)
//         });

//     res.json({ success: true, message:"Logout Successfully!"});
//     } catch (error) {
//         res.status(500).json({
//         statusCode: res.statusCode,
//         errorMsg: error.message
//         });
//     }
// }


import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface IUserBody {
  email: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as IUserBody;
    if (!email && !password ) return res.json("Enter email and password!");
    if (!email) return res.json("Enter email!");
    if (!password) return res.json("Enter password!");

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.json("User already exists..please login!");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash,
    });

    return res.json(user);
  } catch (error: any) {
    res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as IUserBody;

    if (!email && !password) return res.json("Enter email and password!");
    if (!email) return res.json("Enter email!");
    if (!password) return res.json("Enter password!");

    const user = await User.findOne({ email });
    if (!user) return res.json("User not exists! please register..");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.json("Password is incorrect!");

    const token = jwt.sign(
      { email: user.email, role: user.role, id: user._id },
      process.env.JWT_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true });

    return res.json({
      user: {
        success: true,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message,
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const email = req.user.email;
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.json({ success: true, message: `${email} logout Successfully!` });
  } catch (error: any) {
    res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message,
    });
  }
};
