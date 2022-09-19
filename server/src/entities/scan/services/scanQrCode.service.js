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

// ===============================================================

export const scanQrCode = async ({ encryptedQrcode }) => {
  const qrcode = await verifyEncryptedQrCode(encryptedQrcode);
  const { type, expiresAt } = qrcode;
  return { message: "mario" };
};
