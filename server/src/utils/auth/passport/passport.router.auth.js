import { Router } from "express";

// import googleOAuthRouter from "../google-oauth/google.router.auth";
// import githubOAuthRouter from "../github-oauth/github.router.auth";

import { isAuthenticated } from "../middleware/isAuthenticated.auth";
import passportAuthenticate from "./passport.auth";
import {
  me,
  loginController,
  registerController,
  resetPasswordController,
  forgotPassword,
  deleteAccountController,
  changePasswordOTPController,
} from "../oauth/oauth.controller";
import passport from "passport";

// ------------------------------------------------------

const authRouter = Router();

// ------------------------------------------------------

authRouter.route("/auth/login/success").get((req, res) => {
  if (req.user) {
    res.status(200).header({ credentials: "include" }).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

authRouter.route("/auth/login/failed").get((req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

authRouter.route("/auth/logout").get((req, res) => {
  req.logout();
  res.redirect(process.env.CORS_ORIGIN);
});

// // Google OAuth
// authRouter.use("/auth/google", googleOAuthRouter);

// // Github OAuth
// authRouter.use("/auth/github", githubOAuthRouter);

// OAuth
authRouter.route("/oauth/register").post(registerController);
authRouter.route("/oauth/login").post(loginController);

authRouter.route("/oauth/forgot-password").post(forgotPassword);
authRouter.route("/oauth/confirm-otp").post(changePasswordOTPController); 

authRouter.use("/oauth/", [
  passportAuthenticate(passport),
  isAuthenticated,
]);

authRouter.route("/oauth/me").get(me);
authRouter.route("/oauth/reset-password").post(resetPasswordController);
authRouter.route("/oauth/delete").delete(deleteAccountController);

// ------------------------------------------------------

export default authRouter;
