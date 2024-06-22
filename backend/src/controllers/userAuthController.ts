
  import { UploadedFile } from 'express-fileupload';
  import { Request, Response, NextFunction } from 'express';
  import catchAsyncErrors from "../middleware/catchAsyncErrors";
  import userModel from "../models/userModel";
  import ErrorHandler from "../utils/errorHandler";
  import { comparePassword, getJWTToken } from "../utils/jwtToken";
  
  const COOKIE_EXPIRE = 5
  const options = {
    expire: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  const userRegister = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    
  const user = await userModel.create(req.body);
  const token = await getJWTToken(user);

  res.status(200).cookie("token", token, options).json({
  success: true,
  data: user,
  token: token,
  });
  });

  const userLogin = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  //checking if user has given password and  email both

  if (!email || !password ) {
  return next(new ErrorHandler("Please enter email and password ", 400));
  }

  const user = await userModel.findOne({ email }).select("+password ");

  if (!user) {
  return next(new ErrorHandler("Invalid email or password ", 401));
  }
  const token = await getJWTToken(user);
  const isPasswordMatched = await comparePassword(password , user);

  if (!isPasswordMatched) {
  return next(new ErrorHandler("Invalid email or password ", 401));
  }

  res.status(200).cookie("token", token, options).json({
  success: true,
  data: user,
  token: token,
  });
  });

  const forgetPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {});

  const resetPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {});

  const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token");

  res.status(200).json({
  success: true,
  message: "Logged Out",
  });
  });

  export { userRegister, userLogin, forgetPassword, resetPassword, logout }
