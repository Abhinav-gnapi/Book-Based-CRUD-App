import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  updateProfile,
  deleteProfile
} from "../controllers/userController";
import { verifyUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",verifyUser, logoutUser);
router.patch("/user/forgotPassword/resetPassword/:email", verifyUser, resetPassword)
router.patch("/user/updateProfile/:email", verifyUser, updateProfile);
router.delete("/user/deleteProfile/:email", verifyUser, deleteProfile)

export default router;
