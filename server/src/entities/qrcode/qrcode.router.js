import { Router } from "express";
import qrcodeController from "./qrcode.controller";
import passportAuthenticate from "../auth/passport/passport.auth";
import passport from "passport";

// ------------------------------------------------------

const qrcodeRouter = Router();

// ------------------------------------------------------

qrcodeRouter
  .route("/guest/:encryptedInvitation")
  .get(qrcodeController.makeEncryptedInvitation);

qrcodeRouter
  .route("/qrcode/:compoundId")
  .get(passportAuthenticate(passport), qrcodeController.getEncryptedQrCode)
  .post(passportAuthenticate(passport), qrcodeController.verifyQrCode);

// ------------------------------------------------------

export default qrcodeRouter;
