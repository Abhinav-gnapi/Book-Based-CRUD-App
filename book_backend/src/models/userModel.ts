// const mongoose = require('mongoose')

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const userSchema = mongoose.Schema({
//     email: {
//         type: String,
//         required: [true, "Please enter email!"],
//         match: [emailRegex, "Must follow the pattern!"],
//         trim: true,
//         lowercase: true
//     },
//     password: {
//         type: String,
//         required: [true, "Please enter password!"],
//         minLength: 6
//     },
//     role: {
//         type: String,
//         enum: ["admin", "user"],
//         default: "user"
//     }
// })
// const Users = mongoose.model("users", userSchema);
// module.exports = Users;

import mongoose, { Schema } from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface UserI {
  email: string;
  password: string;
  role: "admin" | "user";
}

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
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = mongoose.model<UserI>("users", userSchema);

export default User;
