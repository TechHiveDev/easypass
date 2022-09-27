import { PrismaClient } from "@prisma/client";
import { verifyEncryptedQrCode } from "./verifyQrCode.service";

// ===============================================================

const prisma = new PrismaClient({
  log: ["info"],
});

// ===============================================================

/**
 * Create QrCode for Resident
 */
// export const create = async ({
//   decryptedInvitation,
//   invitationId,
//   deviceId,
// }) => {
//   try {
//     const invitation = await prisma.invitation.findUnique({
//       where: { id: invitationId },
//     });

//     return prisma.scan.create({
//       data: {
//         deviceId,
//         invitationId,
//         success:
//           JSON.stringify(invitation) === JSON.stringify(decryptedInvitation),
//       },
//     });
//   } catch (error) {
//     throw { message: error };
//   }
// };

// model Scan {
//   id Int @id @default(autoincrement())

//   invitationId Int
//   invitation   Invitation @relation(fields: [invitationId], references: [id])

//   deviceId Int
//   device   Device @relation(fields: [deviceId], references: [id])

//   success Boolean

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }
// ===============================================================

export const scanQrCode = async ({ encryptedQrcode, deviceId }) => {
  const qrcode = await verifyEncryptedQrCode(encryptedQrcode);
  const { type, expiresAt, invitation, success, userId, message } = qrcode;

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
      invitationId: invitation?.id,
      success,
      userId,
    },
  });

  return { scan, invitation, user, message, expiresAt };
};
