import { Response } from "express";
import { Request } from "express";

export const authController = (req: Request, res: Response) => {
  res.json({
    success: true,
    user: {
      id: req.user?.id,
      email: req.user?.email,
      role: req.user?.role,
    }
  });
};
