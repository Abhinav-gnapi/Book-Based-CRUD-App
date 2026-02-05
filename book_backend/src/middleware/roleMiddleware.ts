import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

interface AuthRequest extends Request {
  user?: JwtPayload | any;
}

export const verifyRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      return next();
    }
    
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json("Access denied");
    }
    next();
  };
};

