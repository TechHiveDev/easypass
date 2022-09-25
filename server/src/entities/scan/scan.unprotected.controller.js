import express from "express";
import { scanQrCode } from "./services/scanQrCode.service";
const router = express.Router();

//  =================================================================

const guestController = async (req, res, next) => {
  try {
    const { encryptedQrcode } = req?.body;
    // let { success, qrcode } =
    res.send(await scanQrCode({ encryptedQrcode }));
    // res.send({ success });
    // return res.render("QRCode", { qrcode });
  } catch (error) {
    next(error);
  }
};

//  =================================================================

router.route("/guest/").post(guestController);

//  =================================================================

export default router;
