import { PrismaClient } from "@prisma/client";
import { decryptWithPrivateKey } from "../../utils/cryptography/cryptography";

// ===============================================================

const prisma = new PrismaClient({
  log: ["info"],
});

// ===============================================================

/**
 * Create QrCode for Resident
 */
export const create = async ({
  decryptedInvitation,
  invitationId,
  deviceId,
}) => {
  try {
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    return prisma.scan.create({
      data: {
        deviceId,
        invitationId,
        success:
          JSON.stringify(invitation) === JSON.stringify(decryptedInvitation),
      },
    });
  } catch (error) {
    throw { message: error };
  }
};

// ===============================================================

export const scanQrCode = async (encryptedQrScan) => {
  try {
    const { userId, compoundId, type, invitation } =
      await decryptWithPrivateKey(encryptedQrScan);

    if (!userId || !compoundId || !type) {
      throw { status: 400, message: "Invlaid QrCode 1" };
    }

    // TODO: Create Scan, Verify User

    if (type === "Resident") {
      return await verifyResidentQrCode({ userId });
    } else if (type === "Security") {
      return await verifyGuestQrCode({ userId });
    }

    throw { status: 400, message: "Invlaid QrCode 3" };
  } catch (error) {
    throw { status: 400, message: "Invlaid QrCode 3" };
  }
};
