import QRCode from "./qrcode.service";

// -----------------------------------------------------------

/**
 * /guest/:encryptedInvitation
 */
const makeEncryptedInvitation = async (req, res, next) => {
  try {
    let res = await QRCode(req.params.encryptedInvitation);
    return res.render("QRCode", { res });
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------------

/**
 * /guest/:encryptedInvitation
 */
const getEncryptedQrCode = async (req, res, next) => {
  try {
    console.log("req user", req.user);
    let out = await QRCode(req.params.encryptedInvitation);
    return res.render("QRCode", { res: out });
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------------

export default {
  makeEncryptedInvitation,
  getEncryptedQrCode,
};
