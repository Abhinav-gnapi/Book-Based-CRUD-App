import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

import "./db";

import { verifyUser } from "./middleware/authMiddleware";
import { verifyRole } from "./middleware/roleMiddleware";

import createAdmin from "./createMasterAdmin";
 
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/auth";
import bookRoutes from "./routes/bookRoutes";
import userBookRoutes from "./routes/userBookRoutes"
import reviewRoutes from "./routes/reviewRoutes"
import wishlistRoutes from "./routes/wishlistRoutes"

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

createAdmin();

app.get("/", (req: Request, res: Response) => {
  res.json("Message from server API: MongoDB Connected Successfully");
});

app.use("/", userRoutes);
app.use("/auth", authRoutes);

app.get("/admin", verifyUser, verifyRole("admin"), (req: Request, res: Response) => {
  res.json("Welcome admin");
});

app.get("/user", verifyUser, verifyRole("user"), (req: Request, res: Response) => {
  res.json("Welcome user");
});

app.use("/admin",verifyUser,verifyRole("admin"), bookRoutes);
app.use("/user",verifyUser,verifyRole("user"), userBookRoutes)
app.use("/user",verifyUser,verifyRole("user"), reviewRoutes)
app.use("/user", verifyUser, verifyRole("user"), wishlistRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
