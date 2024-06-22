
import express from "express";
import { userRegister, userLogin, logout, forgetPassword, resetPassword } from "../controllers/userAuthController";

// isAuthenticateduser is middleware it check user is login or not
// authorizeRoles('role') is middleware it check user is role to access resources

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password").post(resetPassword);
router.route("/logout").get(logout);

module.exports = router;
