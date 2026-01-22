import "express";

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

declare module "express" {
  interface Request {
    user?: JwtUser;
  }
}
