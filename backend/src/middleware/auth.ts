import ErrorHandler from "../utils/errorHandler";
    import catchAsyncErrors from "./catchAsyncErrors";
    import jwt from 'jsonwebtoken';
    
    import user from "../models/userModel";
    
    const isAuthenticateduser = catchAsyncErrors(async (req, res, next) => {
        const { token } = req.cookies
        const Accesstoken =req.header('authorization');
        
        // const token = Accesstoken.replace('Bearer ',"")
    
        if (!token) {
            return next(new ErrorHandler("Please Login to access this resource", 401))
        }
    
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    
        req.user = await user.findById(decodedData.id).select("+role")
    
        // console.log(req.user)
    
        next()
    })
    
    const authorizeRoles = (...roles) => {
        return catchAsyncErrors(async (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return next(new ErrorHandler("Role is not allowed to access this resource", 403))
            }
    
            next()
        })
    }
    export { isAuthenticateduser, authorizeRoles }