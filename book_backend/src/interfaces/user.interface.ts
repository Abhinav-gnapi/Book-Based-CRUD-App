import { Types } from "mongoose";

interface UserI {
  email: string;
  password: string;
  username: string;
  role: "admin" | "user";
}
export default UserI;