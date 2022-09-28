import express from "express";
import { scanQrCode } from "./services/scanQrCode.service";
const router = express.Router();
import { name } from "../../../../configs";
import qrcode from "qrcode";

//  =================================================================

const scanGuestController = async (req, res, next) => {
  try {
    const { encryptedQrcode, deviceId } = req?.body;
    // let { success, qrcode } =
    res.send(await scanQrCode({ encryptedQrcode, deviceId }));
    // res.send({ success });
    // return res.render("QRCode", { qrcode });
  } catch (error) {
    next(error);
  }
};

//  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
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

router.route("/guest/").post(scanGuestController);

router.route("/guest/:encryptedQrcode").get(guestController);

//  =================================================================

export default router;
