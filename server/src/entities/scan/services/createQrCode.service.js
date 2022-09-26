import qrcode from "qrcode";
import { encryptWithPublicKey } from "../../../utils/cryptography/cryptography";
import invitationService from "../../invitation/invitation.service";
import { isUserBelongsToCompound } from "../../userCompound/userCompound.service";

// ===============================================================

const addHoursToDate = (date = new Date(), hours = 3) => {
  return new Date(new Date(date).setHours(date.getHours() + hours));
};

const addMinutesToDate = (date = new Date(), minutes = 1) => {
  return new Date(new Date(date).setMinutes(date.getMinutes() + minutes));
};

// ===============================================================

/**
 * Generate QrCode for Resident
 */
export const generateResidentQrCode = async ({ userId, compoundId }) => {
  const userCompound = await isUserBelongsToCompound({ userId, compoundId });

  // Type has to be Resident
  if (userCompound?.user?.type !== "Resident") {
    throw { status: 400, message: "user is not resident" };
  }

  return encryptWithPublicKey(
    JSON.stringify({
      userId,
      compoundId,
      type: userCompound?.user?.type,
      expiresAt: addMinutesToDate(new Date(), 1),
    })
  );
};

// ===============================================================

/**
 * Generate QrCode Link for Visitor
 */
export const generateGuestQrCodeInvitationLink = async ({
  userId,
  name = "",
  compoundId,
  type = "Delivery",
  // phone = "",
  notes = "",
}) => {
  const userCompound = await isUserBelongsToCompound({ userId, compoundId });

  let expiresAt = new Date();

  if (type === "Visitor") {
    expiresAt = addHoursToDate(new Date(), 12);
  } else {
    expiresAt = addHoursToDate(new Date(), 3);
  }

  const invitation = await invitationService.create({
    name,
    userId,
    type,
    compoundId,
    expiresAt,
    notes,
  });

  if (!invitation.id) throw { status: 400, message: "can't invite " + type };

  const encryptedQrcode = encryptWithPublicKey(
    JSON.stringify({
      userId,
      compoundId,
      invitationId: invitation?.id,
      type,
      expiresAt: addMinutesToDate(new Date(), 1),
    })
  );

  const fileName = Date.now() + "_" + userId + ".png";
  const path = "assets/qrcodes/" + fileName;

  const image = await qrcode.toFile(
    "assets/qrcodes/" + fileName,
    encryptedQrcode
  );

  return {
    link: `https://easypass-api.techhive.dev/${path}`,
    // link: `http://localhost:5000/${path}`,
    qrcode: encryptedQrcode,
  };
};

// ===============================================================

export const serveQrCodeScreen = async ({}) => {};
