import { QRCodeEncrypt, QRCodeDecrypt } from "./qrcode.service";

// -----------------------------------------------------------

/**
 * /guest/:encryptedInvitation
 */
const makeEncryptedInvitation = async (req, res, next) => {
  try {
    let res = await QRCodeDecrypt(req.params.encryptedInvitation);
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
    const { id: userId } = req.user;
    const { compoundId } = req.params;
    let qrcode = await QRCodeEncrypt({ compoundId, userId });
    return res.status(202).json({ qrcode });
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------------

export default {
  makeEncryptedInvitation,
  getEncryptedQrCode,
};
