const mongoose = require('mongoose')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter email!"],
        match: [emailRegex, "Must follow the pattern!"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter password!"],
        minLength: 6
    }
})
const Users = mongoose.model("users", userSchema);
module.exports = Users;