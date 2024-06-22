
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ErrorHandler from "./errorHandler";

// JWT TOKEN
const getJWTToken = async function (user:any) {
  return await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const comparePassword = async function (enteredpassword:string, user:any) {
  return await bcrypt.compare(enteredpassword, user.password);
};

export { getJWTToken, comparePassword };
