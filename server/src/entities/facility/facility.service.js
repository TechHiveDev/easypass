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

export const getFacilitiesByCompound = async (compoundId) => {
  return await prisma.facility.findMany({ where: { compoundId } });
};

// ------------------------------------------------------------------

export const createFacility = async (data) => {
  if (data.slots) {
    data.slots = data.slots.map(validateAndTransform);
  }
  return await prisma.facility.create({ data });
};

// ------------------------------------------------------------------

export const updateFacility = async (id, data) => {
  if (data.slots) {
    data.slots = data.slots.map(validateAndTransform);
  }
  return prisma.facility.update({ where: { id }, data });
};

const validateAndTransform = (slot, index) => {
  const fromDate = slot.from.split("T")[0];
  const toTime = slot.to.split("T")[1];
  const toTransformed = `${fromDate}T${toTime}`;
  const fromObject = new Date(slot.from);
  const toObject = new Date(toTransformed);
  if (fromObject > toObject)
    throw { message: `to can't be less than from in slot number ${index}` };
  return {
    ...slot,
    to: toTransformed,
  };
};

// ------------------------------------------------------------------
