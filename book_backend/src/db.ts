const mongoose = require("mongoose");
import dotenv from "dotenv"

dotenv.config();

mongoose.connect(process.env.dbConnection_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err: Error) => console.error(err));

module.exports = mongoose;
