import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import UserI from "../interfaces/user.interface";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as UserI;
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
    const { email, password } = req.body as UserI;

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
