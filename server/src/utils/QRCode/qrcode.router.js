import { Router } from "express";
import qrcodeController from "./qrcode.controller";
// ------------------------------------------------------

const qrcodeRouter = Router();

// ------------------------------------------------------

qrcodeRouter
  .route("/guest/:encryptedInvitation")
  .get((req, res, next) => qrcodeController(req, res, next));

// ------------------------------------------------------

export default qrcodeRouter;
