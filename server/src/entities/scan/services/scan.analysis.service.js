import { PrismaClient } from "@prisma/client";

// ===============================================================

const prisma = new PrismaClient({
  log: ["info"],
});

// ===============================================================

/**
 * report successful Scan Report
 */
export const scanReport = async (compoundIds) => {
  const data = await prisma.scan.findMany({ where: { success: true } });
};

// ===============================================================
