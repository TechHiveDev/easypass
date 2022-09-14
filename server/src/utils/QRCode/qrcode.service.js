import qrcode from "qrcode";
import { decryptWithPrivateKey } from "../../utils/cryptography/cryptography";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: [
    "info",
    // "query"
  ],
});

// ------------------------------------------------------------

const QRCode = async (encryptedInvitation) => {
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

    return  qrcode.toDataURL(encryptedInvitation) ;
  } catch (error) {
    throw { message: error };
  }
};

// ------------------------------------------------------------------

export default QRCode;
