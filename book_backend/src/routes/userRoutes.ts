import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword
} from "../controllers/userController";
import { verifyUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",verifyUser, logoutUser);
router.patch("/user/forgotPassword/resetPassword/:email", verifyUser, resetPassword)

export default router;
