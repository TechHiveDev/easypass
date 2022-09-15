import { Router } from "express";
import qrcodeController from "./qrcode.controller";
// ------------------------------------------------------

const qrcodeRouter = Router();

// ------------------------------------------------------

qrcodeRouter.route("/qrcode").get(qrcodeController.getEncryptedQrCode);

qrcodeRouter
  .route("/guest/:encryptedInvitation")
  .get(qrcodeController.makeEncryptedInvitation);

// ------------------------------------------------------

export default qrcodeRouter;
