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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ------------------------------------------------------------

export const getDiscoverByCompound = async (compoundId) => {
  return await prisma.discover.findMany({ where: { compoundId } });
};

// ------------------------------------------------------------------

export const createDiscover = async (adminId, data) => {
  return await prisma.discover.create({ data: { ...data, userId: adminId } });
};
// ------------------------------------------------------------------
