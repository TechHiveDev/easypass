import express from "express";
import { scanQrCode } from "./services/scanQrCode.service";
import { name } from "../../../../configs";
import qrcode from "qrcode";

//  =================================================================

const router = express.Router();

//  =================================================================

const scanGuestController = async (req, res, next) => {
  try {
    const { encryptedQrcode, deviceId } = req?.body;
    res.send(await scanQrCode({ encryptedQrcode, deviceId }));
  } catch (error) {
    next(error);
  }
};

//  =================================================================

const guestController = async (req, res, next) => {
  try {
    const { encryptedQrcode } = req?.params?.encryptedQrcode;
    const { message } = await scanQrCode({ encryptedQrcode });
    res.render("qrcode", {
      qr_code: await qrcode.toDataURL(req.params.encryptedQrcode),
      title: name,
      message,
    });
  } catch (err) {
    next(err);
  }
};

//  =================================================================

// What ?
const validateQrcode = (qrcode) => console.log(qrcode);

//  =================================================================

const arduinoScannerController = async (req, res, next) => {
  try {
    res.render("arduino", { validateQrcode });
  } catch (err) {
    next(err);
  }
};

//  =================================================================

/**
 * What is this , and why it's here ?
 */
router.route("/guest/:encryptedQrcode").get(guestController);
router.route("/arduino").get(arduinoScannerController);
router.route("/guest/").post(scanGuestController);

//  =================================================================

export default router;
