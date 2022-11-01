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

export const getRequestsByCompound = async (compoundId) => {
  return await prisma.request.findMany({ where: { compoundId } });
};

export const getRequestsByUser = async (userId) => {
  return await prisma.request.findMany({ where: { userId } });
};
export const createRequest = async (data) => {
  const { availableDateFrom, availableDateTo, facilityId } = data;

  let facility = await prisma.facility.findUnique({
    where: { id: facilityId },
  });
  const { slots, ...res } = facility;
  for (let i = 0; i < slots.length; i++) {
    if (
      slots[i].from == availableDateFrom &&
      slots[i].to == availableDateTo &&
      slots[i].available
    ) {
      slots[i].available = false;

      console.log({ ...res, slots });
      await prisma.facility.update({
        where: { id: facilityId },
        data: { ...res, slots },
      });
      return await prisma.request.create({ data });
    }
  }

  throw { status: 400, message: "invalid request or no slots available" };
};
// ------------------------------------------------------------------
