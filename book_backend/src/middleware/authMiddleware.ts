import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json("Token was not available!");
  }

  jwt.verify(token, process.env.JWT_KEY as string, (err:any, decoded:any) => {
    if (err) return res.status(401).json("Token is wrong");

    req.user = decoded as {
      id: string;
      email: string;
      role: string;
    };
    next();
  });
};
