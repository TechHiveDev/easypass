import QRCode from "./qrcode.service";

// -----------------------------------------------------------

// /guest/:encryptedInvitation
const qrcodeController = async (req, res, next) => {
  try {
    let out = await QRCode(req.params.encryptedInvitation);
    // console.log({ res });
    return res.render("QRCode", { res: out });
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------------

export default qrcodeController;
