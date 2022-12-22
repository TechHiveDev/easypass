import express from "express";
import { scanQrCode } from "./services/scanQrCode.service";
const router = express.Router();
import { name } from "../../../../configs";
import qrcode from "qrcode";

//  =================================================================

const scanGuestController = async (req, res, next) => {
  try {
    const { encryptedQrcode, deviceId } = req?.body;
    // res.send({scan:{success:true}})
    res.send(await scanQrCode({ encryptedQrcode, deviceId }));
  } catch (error) {
    next(error);
  }
};

//  =================================================================

const guestController = async (req, res, next) => {
  try {
    const encryptedQrcode = await scanQrCode({
      encryptedQrcode: req.params.encryptedQrcode,
    });
    res.render("qrcode", {
      qr_code: await qrcode.toDataURL(req.params.encryptedQrcode),
      title: name,
      message: encryptedQrcode.message,
    });
  } catch (err) {
    next(err);
  }
};

//  =================================================================

router.route("/guest/:encryptedQrcode").get(guestController);

//  =================================================================
const validateQrcode = (qrcode) => {
  console.log(qrcode);
}
const arduinoScannerController = async (req, res, next) => {
  try {
    res.render("arduino", { validateQrcode });
  } catch (err) {
    next(err);
  }
};

//  =================================================================

router.route("/arduino").get(arduinoScannerController);

//  =================================================================

router.route("/guest/").post(scanGuestController);

//  =================================================================

export default router;
