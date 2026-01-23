import mongoose, { Schema } from "mongoose";
import UserI from "../interfaces/user.interface";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema<UserI>({
  email: {
    type: String,
    required: [true, "Please enter email!"],
    match: [emailRegex, "Must follow the pattern!"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password!"],
    minLength: 6,
  },
  username: {
    type: String,
    required: [true, "Please enter username!"]
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = mongoose.model<UserI>("users", userSchema);

export default User;
