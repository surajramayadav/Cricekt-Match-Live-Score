
import express from "express";
import { getMatches, getScore } from "../controllers/match";

// isAuthenticateduser is middleware it check user is login or not
// authorizeRoles('role') is middleware it check user is role to access resources

const router = express.Router();

router.route("/").get(getMatches);
router.route("/score").get(getScore);


module.exports = router;
