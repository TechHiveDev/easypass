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
import { parseQuery } from "../../utils/crud/controller/controller.utils";
const prisma = new PrismaClient();

// ------------------------------------------------------------

export const getRequestsByCompound = async (compoundId) => {
  return await prisma.request.findMany({ where: { compoundId } });
};

export const getRequestsByUser = async (userId, query) => {
  const { q, limit, offset, filter, order, from, to } = parseQuery(
    query
  );
  return await prisma.request.findMany({
    take: limit,
    skip: offset,
    where: { ...filter, userId },
    orderBy: order,
    include: { facility: true }
  });
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

export const deleteRequest = async (id) => {
  const request = await prisma.request.findUnique({ where: { id } });

  let facility = await prisma.facility.findUnique({
    where: { id: request.facilityId },
  });

  const { slots, ...res } = facility;
  for (let i = 0; i < slots.length; i++) {
    if (
      new Date(slots[i].from).getTime() == request.availableDateFrom.getTime() &&
      new Date(slots[i].to).getTime() == request.availableDateTo.getTime() &&
      !slots[i].available
    ) {
      slots[i].available = true;

      await prisma.facility.update({
        where: { id: request.facilityId },
        data: { ...res, slots },
      });
      // return await prisma.request.delete({ data });
      return await prisma.request.delete({ where: { id } });
    }
  }

}
