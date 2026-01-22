import "express";
import JwtUser from "../interfaces/userJWT.interface";

declare module "express" {
  interface Request {
    user?: JwtUser;
  }
}
