require('./db')
const bcrypt = require("bcrypt");
const User = require("./models/userModel");


async function createAdmin() {
  try{
    const existing = await User.findOne({ role: "admin" });
    if (existing) {
      console.log("Admin already exists");
    }else{

    const password = await bcrypt.hash("admin123", 10);

    await User.create({
      email: "admin@system.com",
      password,
      role: "admin"
    });

    console.log("Master admin created");
  }
  } catch (error) {
    res.status(400).json({
      statusCode: res.statusCode,
      errorMsg: error.message
    });
  }
}

module.exports = createAdmin;
