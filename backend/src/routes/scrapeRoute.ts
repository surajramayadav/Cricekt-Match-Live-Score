
import express from "express";
import { MatchDetail } from "../controllers/scrape/matchDetails";

// isAuthenticateduser is middleware it check user is login or not
// authorizeRoles('role') is middleware it check user is role to access resources

const router = express.Router();

router.route("/match-detail").get(MatchDetail);


module.exports = router;
