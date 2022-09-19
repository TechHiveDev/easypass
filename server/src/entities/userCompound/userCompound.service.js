import { PrismaClient } from "@prisma/client";

// ===============================================================

const prisma = new PrismaClient();

// ===============================================================

export const isUserBelongsToCompound = async ({ userId, compoundId }) => {
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

  return userCompound;
};
