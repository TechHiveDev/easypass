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
    throw { status: 400, message: "Invalid Qrcode" };
  }

  const userCompound = await isUserBelongsToCompound({ userId, compoundId });

  console.log({ expiresAt });

  if (type === "Visitor") {
    return await verifyGuestQrCode({ invitationId });
  } else if (type === "Resident") {
    return await verifyResidentQrCode({ ...decryptedObject, userCompound });
  }

  // Valid Resident
  throw { status: 400, message: "Invalid Qrcode Type" };
};

// ===============================================================

/**
 * Verify Scan QrCode for Resident expired or not
 */
export const verifyResidentQrCode = async ({ expiresAt, ...rest }) => {
  console.log({ expiresAt });

  if (new Date(expiresAt) < new Date()) {
    throw { status: 400, message: "Expired QrCode" };
  }

  return { ...rest };
};

// ===============================================================

/**
 * Verify Scan QrCode for Guest ( delivery or guest )
 */
export const verifyGuestQrCode = async ({ expiresA }) => {
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
  });
};
