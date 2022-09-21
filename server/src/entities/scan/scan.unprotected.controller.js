import express from "express";
import { scanQrCode } from "./services/scanQrCode.service";
const router = express.Router();

//  =================================================================

const guestController = async (req, res, next) => {
  try {
    const { encryptedQrcode } = req?.params;
    let { success, qrcode } = await scanQrCode({ encryptedQrcode });
    return res.render("QRCode", { qrcode });
  } catch (error) {
    next(error);
  }
};

//  =================================================================

router.route("/guest/:encryptedQrCode").get(guestController);

//  =================================================================

export default router;
