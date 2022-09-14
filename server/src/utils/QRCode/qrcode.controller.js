import QRCode from "./qrcode.service";

// -----------------------------------------------------------

// /guest/:encryptedInvitation
const qrcodeController = async (req, res, next) => {
  try {
    let src = await QRCode(req.params.encryptedInvitation);
    console.log("controller =>", src);
    return res.render("QRCode", {
      res: {
        qr_code: src,
      },
    });
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------------

export default qrcodeController;
