
  import { UploadedFile } from 'express-fileupload';
  import { Request, Response, NextFunction } from 'express';
  import catchAsyncErrors from "../middleware/catchAsyncErrors";
  import userModel from "../models/userModel";
  import ErrorHandler from "../utils/errorHandler";
  
  import { getJWTToken } from "../utils/jwtToken";
  const COOKIE_EXPIRE = 5
      const options = {
        expire: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
  // Add user
  const adduser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {

      
      const user = await userModel.create(req.body);
       const token = await getJWTToken(user);
      
         res.status(200).cookie("token", token, options).json({
              success: true,
              data: user,
              token: token,
            });;
        
     
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
  
  // Get user Using Id
  const viewuserById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userModel.findById(req.params.id);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
  
  // Get all user
  const viewuser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userModel.find();
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  // Delete user
  const deleteuser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await userModel.findById(req.params.id);
      if (!user) {
        return next(new ErrorHandler("user not found", 404));
      }
      user = await user.deleteOne();
  
      res.status(200).json({
        success: true,
        message: "user deleted Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
  
  // Update user
  const updateuser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await userModel.findById(req.params.id);
      if (!user) {
        return next(new ErrorHandler("user not found", 404));
      }
      
  
      user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        userFindAndModify: false,
      });
  
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
  export { adduser, viewuser, viewuserById, deleteuser, updateuser }

  
    