import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import UserI from "../interfaces/user.interface";

export interface resetPasswordI {
    password: string;
    confirmPassword: string;
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body as UserI;
    if (!email && !password && !username) return res.status(400).json("Enter email, username and password!");
    if (!email) return res.status(400).json("Enter email!");
    if (!username) return res.status(400).json("Enter username!");
    if (!password) return res.status(400).json("Enter password!");

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.json("User already exists..please login!");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash,
      username
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
    const { email, password } = req.body as UserI;

    if (!email && !password) return res.status(400).json("Enter email and password!");
    if (!email) return res.status(400).json("Enter email!");
    if (!password) return res.status(400).json("Enter password!");

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not exists! please register..");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json("Password is incorrect!");

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

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    if (!email){
      return res.status(400).json({ message: "Enter email Id"});
    }

    const existUser = await User.findOne({email});
    if(!existUser){
      return res.status(404).json({message: "User not exist"})
    }

    const {password, confirmPassword} = req.body as resetPasswordI;
    if(!password && !confirmPassword) return res.status(400).json("Enter password and confirm password!");
    if (!password) return res.status(400).json("Enter password!");
    if (!confirmPassword) return res.status(400).json("Enter confirm password!");

    if(password !== confirmPassword){
      return res.status(400).json("password and confirm password must be same!")
    }

    // const isMatch = await bcrypt.compare(password, existUser.password);
    // if (isMatch) return res.status(400).json("Password is match with the previous password, enter new password!");

    const hash = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({email}, {password: hash}, {new: true, runValidators: true});
    res.json("Password updated successfully!");
  } catch (error: any) {
    res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message,
    });
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const email = req.user.email;
    
    if(!req.body){
      return res.status(400).json("You didn't enter nothing yet!");
    }
    const {username} = req.body;
    await User.findOneAndUpdate({email}, {username}, {new: true})
    res.status(200).json(`username updated successfully to ${username}`);
  } catch (error: any) {
    res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message,
    });
  }
}

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const email = req.user.email;

    const deletedUser = await User.findOneAndDelete({email});
    // if (!deletedUser) {
    //   return res.status(404).json("User not found!");
    // }
    res.status(200).json({
      message: "User profile deleted successfully!",
      details: deletedUser
    })
  } catch (error: any) {
    res.status(500).json({
      statusCode: res.statusCode,
      errorMsg: error.message,
    });
  }
}