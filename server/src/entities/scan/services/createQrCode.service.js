import { encryptWithPublicKey } from "../../../utils/cryptography/cryptography";
import invitationService from "../../invitation/invitation.service";
import { isUserBelongsToCompound } from "../../userCompound/userCompound.service";
import { API_URL } from "../../../../../configs";

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

  const stringifiedObj = JSON.stringify({
    userId,
    compoundId,
    type: userCompound?.user?.type,
    expiresAt: addMinutesToDate(new Date(), 1),
  })

  return encodeURI(stringifiedObj);
  // return encryptWithPublicKey(stringifiedObj);
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

  const stringifiedObj = JSON.stringify({
    userId,
    compoundId,
    invitationId: invitation?.id,
    type,
    expiresAt: addMinutesToDate(new Date(), 1),
  })

  // const encryptedQrcode = encryptWithPublicKey(stringifiedObj);
  const encryptedQrcode = encodeURI(stringifiedObj);

  return {
    link: `${API_URL}/guest/${encryptedQrcode}`,
    qrcode: encryptedQrcode,
  };
};

// ===============================================================

export const serveQrCodeScreen = async ({ }) => { };
