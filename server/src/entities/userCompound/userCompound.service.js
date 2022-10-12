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

export const getUserCompounds = async (userId) => {
  if (!userId) {
    throw { status: 400, message: "userId is required" };
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { userCompound: true },
  });
  let arr = [];
  for (let index = 0; index < user.userCompound.length; index++) {
    const compound = await prisma.compound.findUnique({
      where: { id: user.userCompound[index].compoundId },
    });
    arr.push({
      ...user.userCompound[index],
      compoundName: compound.name,
      logoUrl: compound.logoUrl,
    });
  }
  return arr;
};
