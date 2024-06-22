import { Request, Response, NextFunction } from 'express';
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from '../utils/errorHandler';
import axios from 'axios';

const getMatches = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data }: any = await axios.get(`https://hs-consumer-api.espncricinfo.com/v1/global/fastscore/message/base?messageId=${process.env.MESSAGE_ID}`)
        if (data) {
            res.status(200).json({
                success: true,
                data: data,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "please change api key",
            });
        }


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


const getScore = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data }: any = await axios.get(`https://hs-consumer-api.espncricinfo.com/v1/pages/match/details?lang=en&seriesId=1389381&matchId=1389393&latest=true`)
        if (data) {
            res.status(200).json({
                success: true,
                data: data,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "please change api key",
            });
        }


    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


export { getMatches, getScore }