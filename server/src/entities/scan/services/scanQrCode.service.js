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
  const { type, expiresAt, invitationId, success } = qrcode;
  console.log(success)

  if (!success) {
    return qrcode;
  }
  const scan = await prisma.scan.findFirst({ where: { invitationId } });
  console.log(scan)
  if (scan) {
    return { success: false, message: "Invitation already Used" };
  }

  return await prisma.scan.create({
    data: {
      deviceId,
      invitationId,
      success,
    },
  });
};
