import catchAsyncErrors from "../../middleware/catchAsyncErrors";
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from "../../utils/errorHandler";
import axios from "axios";
const cheerio = require('cheerio');

const MatchDetail = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { data }: any = await axios.get('https://www.espncricinfo.com/')
        const $1 = cheerio.load(data);
        let matchArray: any = []

        $1('#main-container > div.ds-pb-4.ds-bg-fill-hsb.ds-pt-2 > div > div.ds-pt-2 > div > div').children().children().children().each(async (i: number, element: any) => {
            matchArray.push({
                live: $1(element).find(`div.ds-truncate > span:nth-child(1)`).text(),
                type: $1(element).find(`div.ds-truncate > span:nth-child(2)`).text(),
                team1: $1(element).find(`div.ds-flex.ds-flex-col.ds-mb-2.ds-mt-1.ds-space-y-1 > div:nth-child(1) > div > p`).text(),
                team2: $1(element).find(`div.ds-flex.ds-flex-col.ds-mb-2.ds-mt-1.ds-space-y-1 > div:nth-child(2) > div > p`).text(),
                today: $1(element).find(`div.ds-text-tight-xs.ds-text-right > div:nth-child(1)`).text(),
                time_to_start: $1(element).find(`div.ds-text-tight-xs.ds-text-right > div:nth-child(2)`).text(),
                team1_score: $1(element).find(` div:nth-child(3) > div > a > div > div > div:nth-child(2) > div`).text(),
                team2_score: $1(element).find(`div:nth-child(3) > div > a > div > div > div:nth-child(2) > div > div:nth-child(2)`).text(),
                element: $1(element).text(),


            })



        })

        res.status(200).json({
            success: true,
            data: matchArray,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


export { MatchDetail }


//Home api
// https://hs-consumer-api.espncricinfo.com/v1/global/fastscore/message/base?messageId=lm-en-1701004887921




// get data from home series id and match id(matchMeta)
// https://hs-consumer-api.espncricinfo.com/v1/pages/match/details?lang=en&seriesId=1389381&matchId=1389392&latest=true

// image url

// https://img1.hscicdn.com/image/upload/f_auto/lsci/