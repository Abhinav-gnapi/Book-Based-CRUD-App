import express from "express";
import { authController } from "../controllers/authController";
import { verifyUser } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/me", verifyUser, authController);

export default router;
