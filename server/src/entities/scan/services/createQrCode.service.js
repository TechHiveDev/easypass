import { PrismaClient } from "@prisma/client";
import { encryptWithPublicKey } from "../../utils/cryptography/cryptography";
import invitationService from "../../invitation/invitation.service";

// ===============================================================

const prisma = new PrismaClient({ log: ["info"] });

// ===============================================================

const addHoursToDate = (date = new Date(), hours = 3) => {
  return new Date(new Date(date).setHours(date.getHours() + hours));
};

// ===============================================================

/**
 * Generate QrCode for Resident
 */
export const generateResidentQrCode = async ({ userId, compoundId }) => {
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

// ===============================================================

/**
 * Generate QrCode Link for Visitor
 */
export const generateGuestQrCodeInvitationLink = async ({
  userId,
  name = "",
  compoundId,
  type = "Visitor",
  expiresIn = null,
  notes = "",
}) => {
  try {
    if (!expiresIn) {
      // expires in 3 hours
      expiresIn = addHoursToDate(new Date(), 3);
    }

    // TODO: check if there is a user and compound

    const invitation = await invitationService.create({
      name,
      userId,
      type,
      compoundId,
      expiresAt,
      notes,
    });

    // Create invitation
    // const invitation = await

    // if (!userId || !compoundId) {
    //   throw { status: 400, message: "userId , compoundId is required" };
    // }
    // const userCompound = await prisma.userCompound.findFirst({
    //   where: { userId: userId, compoundId: compoundId },
    //   include: { user: true, compound: true },
    // });
    // if (!userCompound) {
    //   throw { status: 404, message: "user compound is not exist" };
    // }
    // let payload = { userId, compoundId, type: "Resident" };
    // return encryptWithPublicKey(JSON.stringify(payload));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
