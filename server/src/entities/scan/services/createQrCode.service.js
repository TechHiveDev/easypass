import { PrismaClient } from "@prisma/client";
import { encryptWithPublicKey } from "../../../utils/cryptography/cryptography";
import invitationService from "../../invitation/invitation.service";
import { isUserBelongsToCompound } from "../../userCompound/userCompound.service";

// ===============================================================

const prisma = new PrismaClient({ log: ["info"] });

// ===============================================================

const addHoursToDate = (date = new Date(), hours = 3) => {
  return new Date(new Date(date).setHours(date.getHours() + hours));
};

const addMinutesToDate = (date = new Date(), minutes = 1) => {
  return new Date(new Date(date).setMinutes(date.getMinutes() + minutes));
};

// ===============================================================

/**
 * Generate QrCode for Resident
 */
export const generateResidentQrCode = async ({ userId, compoundId }) => {
  const userCompound = await isUserBelongsToCompound({ userId, compoundId });

  // Type has to be Resident
  if (userCompound?.user?.type !== "Resident") {
    throw { status: 400, message: "user is not resident" };
  }

  return encryptWithPublicKey(
    JSON.stringify({
      userId,
      compoundId,
      type: userCompound?.user?.type,
      expiresAt: addMinutesToDate(new Date(), 1),
    })
  );
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
  if (!expiresIn) {
    expiresIn = addHoursToDate(new Date(), 3);
  }

  const userCompound = await isUserBelongsToCompound({ userId, compoundId });

  const invitation = await invitationService.create({
    name,
    userId,
    type,
    compoundId,
    expiresAt,
    notes,
  });

  return false;
};
