import qrcode from "qrcode";
import {
  decryptWithPrivateKey,
  encryptWithPublicKey,
} from "../../utils/cryptography/cryptography";
import { PrismaClient } from "@prisma/client";
import { prismaCrud } from "../../utils/crud/express-crud-router";

// ------------------------------------------------------------

const prisma = new PrismaClient({ log: ["info"] });

// ------------------------------------------------------------

// const decryptQrCode = async (encryptedInvitation) => {
//   try {
//     const decryptedInvitation = decryptWithPrivateKey(encryptedInvitation);

//     const invitation = await prisma.invitation.findUnique({
//       where: { id: decryptedInvitation?.id },
//     });

//     const invalidLink =
//       JSON.stringify(invitation) !== JSON.stringify(decryptedInvitation);

//     const expired = new Date(invitation?.expiresAt) < new Date();

//     if (invalidLink) return { message: "Invalid Link" };

//     if (expired) return { message: "Expired Link" };

//     const qr_code = await qrcode.toDataURL(encryptedInvitation);

//     return { qr_code };
//   } catch (error) {
//     return { message: "Invalid Link" };
//   }
// };

// ------------------------------------------------------------------
/**
 * Generate QrCode for Resident
 */
const generateResidentQrCode = async ({ userId, compoundId }) => {
  try {
    if (!userId || !compoundId) {
      throw { status: 400, message: "userId , compoundId is required" };
    }

    const userCompound = await prisma.userCompound.findFirst({
      where: { userId: userId, compoundId: compoundId },
      include: { user: true, compound: true },
    });

    if (!userCompound) {
      throw { status: 404, message: "user compound is not exist" };
    }

    let payload = { userId, compoundId, type: "Resident" };
    return encryptWithPublicKey(JSON.stringify(payload));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ------------------------------------------------------------------

/**
 *
 */
const verifyQrCodeScanResidentOrGuest = async ({
  userId,
  compoundId,
  encryptedQrCode,
  type,
}) => {
  try {
    // let { compoundId, userId } = JSON.parse(
    //   await decryptWithPrivateKey(encryptedQrCode)
    // );
  } catch (error) {
    return { message: "Invalid QrCode" };
  }
};

// ------------------------------------------------------------------

const verifyQrCodeScanResident = async () => {};

// ------------------------------------------------------------------

const verifyQrCodeScanGuest = async () => {};

// ------------------------------------------------------------------

export default {
  generateResidentQrCode,
  verifyQrCodeScanResidentOrGuest,
  //   decryptQrCode,
  //   verifyResident,
};
