import qrcode from "qrcode";
import {
  decryptWithPrivateKey,
  encryptWithPublicKey,
} from "../../utils/cryptography/cryptography";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: [
    "info",
    // "query"
  ],
});

// ------------------------------------------------------------

export const QRCodeDecrypt = async (encryptedInvitation) => {
  try {
    const decryptedInvitation = decryptWithPrivateKey(encryptedInvitation);

    const invitation = await prisma.invitation.findUnique({
      where: { id: decryptedInvitation?.id },
    });

    const invalidLink =
      JSON.stringify(invitation) !== JSON.stringify(decryptedInvitation);

    const expired = new Date(invitation?.expiresAt) < new Date();

    if (invalidLink) return { message: "Invalid Link" };

    if (expired) return { message: "Expired Link" };

    const qr_code = await qrcode.toDataURL(encryptedInvitation);

    return { qr_code };
  } catch (error) {
    return { message: "Invalid Link" };
  }
};

// ------------------------------------------------------------------

export const QRCodeEncrypt = async (objectToEncrypt = {}) => {
  try {
    return encryptWithPublicKey(JSON.stringify(objectToEncrypt));
  } catch (error) {}
};
// ------------------------------------------------------------------

export const verifyResident = async ({
  userId,
  compoundId,
  encryptedQrCode,
}) => {
  try {
    let { compoundId, userId } = JSON.parse(
      await decryptWithPrivateKey(encryptedQrCode)
    );
  } catch (error) {
    return { message: "Invalid Link" };
  }
};
