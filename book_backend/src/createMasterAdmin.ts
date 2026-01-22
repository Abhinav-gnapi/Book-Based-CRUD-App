// import "./db";
// import bcrypt from "bcrypt";
// import User from "./models/userModel";


// async function createAdmin() {
//   try{
//     const existing = await User.findOne({ role: "admin" });
//     if (existing) {
//       console.log("Admin already exists");
//     }else{

//     const password = await bcrypt.hash("admin123", 10);

//     await User.create({
//       email: "admin@system.com",
//       password,
//       role: "admin"
//     });

//     console.log("Master admin created");
//   }
//   } catch (error:any) {
//     console.error("Error creating admin:", error.message);
//   }
// }

// export default createAdmin;

import "./db";
import bcrypt from "bcrypt";
import User from "./models/userModel";
import dontenv from "dotenv"

dontenv.config();

const createAdmin = async (): Promise<void> => {
  try {
    const existing = await User.findOne({ role: "admin" });

    if (existing) {
      console.log("Admin already exists");
      return;
    }

    const password = await bcrypt.hash(process.env.adminPass as string, 10);

    await User.create({
      email: "admin@system.com",
      password,
      role: "admin",
    });

    console.log("Master admin created");
  } catch (error: any) {
    console.error("Error creating admin:", error.message);
  }
};

export default createAdmin;
