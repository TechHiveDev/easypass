import { PrismaClient } from "@prisma/client";
import { verifyEncryptedQrCode } from "./verifyQrCode.service";

// ===============================================================

const prisma = new PrismaClient({ log: ["info"] });

// ===============================================================

export const scanQrCode = async ({ encryptedQrcode, deviceId }) => {
  const qrcode = await verifyEncryptedQrCode(encryptedQrcode);
  const { type, expiresAt, invitation, success, userId, message, compoundId } =
    qrcode;

  let user;
  if (!invitation) {
    user = await prisma.user.findFirst({
      where: { id: userId },
      include: { userCompound: true },
    });
  }

  const scan = await prisma.scan.create({
    data: {
      type,
      deviceId,
      compoundId,
      invitationId: invitation?.id,
      success,
      userId,
    },
  });

  return { scan, invitation, user, message, expiresAt };
};
