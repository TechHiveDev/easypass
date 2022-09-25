import { PrismaClient } from "@prisma/client";
import { decryptWithPrivateKey } from "../../../utils/cryptography/cryptography";
import { isUserBelongsToCompound } from "../../userCompound/userCompound.service";

// ===============================================================

const prisma = new PrismaClient({
  log: ["info"],
});

// ===============================================================

export const verifyEncryptedQrCode = async (encryptedQrcode) => {
  const decryptedString = await decryptWithPrivateKey(encryptedQrcode);
  const decryptedObject = JSON.parse(decryptedString);

  const { userId, compoundId, type, expiresAt } = decryptedObject;

  if (!userId || !compoundId || !type || !expiresAt) {
    return { success: false, message: "Invalid QrCode Payload" };
  }

  const userCompound = await isUserBelongsToCompound({ userId, compoundId });

  if (type === "Delivery" || type === "Visitor") {
    return await verifyGuestQrCode({ ...decryptedObject });
  } else if (type === "Resident") {
    return await verifyResidentQrCode({ ...decryptedObject, userCompound });
  }

  return { success: false, message: "Invalid QrCode Type" };
};

// ===============================================================

/**
 * Verify Scan QrCode for Resident expired or not
 */
export const verifyResidentQrCode = async ({ expiresAt, ...rest }) => {
  if (new Date(expiresAt) < new Date()) {
    return { success: false, message: "Expired QrCode" };
  }
  return { ...rest, success: true, message: "QrCode Accepted" };
};

// ===============================================================

// TODO : VERIFY QR CODE FOR GUEST ( Delivery or Vistor )
/**
 * 1 -
 */

/**
 * Verify Scan QrCode for Guest ( delivery or guest )
 */
export const verifyGuestQrCode = async ({
  expiresAt,
  invitationId,
  userId,
  ...rest
}) => {
  if (!userId || !compoundId || !type || !invitationId) {
    return { success: false, message: "Invalid QrCode Payload" };
  }

  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId, userId },
  });
  // console.log(invitation)
  if (!invitation) return { success: false, message: "Invalid QrCode" };

  // TODO : check user id , is the user id thas owns the invitation

  // if userid not the owner of the invitation or any thing wrong return Invalid QrCode

  if (new Date(expiresAt) < new Date()) {
    return { success: false, message: "Expired QrCode" };
  }
  return {
    ...rest,
    invitationId,
    userId,
    success: true,
    message: "QrCode Accepted",
  };
};
