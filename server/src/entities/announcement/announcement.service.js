/**
 *  Entity Service
 * ------------------------------------
 * this module aim to carry custom bussniess logic
 * for entity if entity not just CRUD
 *
 * you can add here any bussiness logic you need
 * and will be calls from entity controller
 *
 * Entity
 * router => controller => service => controller
 *
 */

// ------------------------------------------------------------

/**
 *  you can call your orm here ( prisma ) and
 *  return what you want from database
 *
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ------------------------------------------------------------

export const getAnnouncementByCompound = async (compoundId) => {
  return await prisma.announcement.findMany({ where: { compoundId } });
};

// ------------------------------------------------------------------

export const createAnnouncement = async (adminId, data) => {
  return await prisma.announcement.create({
    data: { ...data, userId: adminId },
  });
};
// ------------------------------------------------------------------
