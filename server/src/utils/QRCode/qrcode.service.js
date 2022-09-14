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

    console.log(new Date(invitation?.expiresAt), new Date(), expired);

    if (invalidLink) return { message: "Invalid Link" };

    if (expired) return { message: "Expired Link" };

    const qr_code = await qrcode.toDataURL(encryptedInvitation);

    return { qr_code };
  } catch (error) {
    return { message: "Invalid Link" };
  }
};

// ------------------------------------------------------------------

export default QRCode;
