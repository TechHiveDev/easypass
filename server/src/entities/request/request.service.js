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

import { sendNotification } from "../../utils/notification/expo.js";

// ------------------------------------------------------------

export const getRequestsByCompound = async (compoundId) => {
  return await prisma.request.findMany({ where: { compoundId } });
};

// ------------------------------------------------------------------

export const getRequestsByUser = async (userId, query) => {
  const { q, limit, offset, filter, order, from, to } = parseQuery(query);
  return await prisma.request.findMany({
    take: limit,
    skip: offset,
    where: { ...filter, userId },
    orderBy: order,
    include: { facility: true },
  });
};

// ------------------------------------------------------------------

export const createRequest = async (data) => {
  try {
    const { availableDateFrom, availableDateTo, facilityId } = data;

    if (data.type === "Facility") {
      let facility = await prisma.facility.findUnique({
        where: { id: facilityId },
      });
      let { slots, ...res } = facility;

      slots = slots.map(validateAndTransform);

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
    } else {
      return await prisma.request.create({ data });
    }
  } catch (e) {
    throw e;
  }
};

// ------------------------------------------------------------------

export const deleteRequest = async (id) => {
  const request = await prisma.request.findUnique({ where: { id } });

  if (request.type === "Facility") {
    let facility = await prisma.facility.findUnique({
      where: { id: request.facilityId },
    });

    const { slots, ...res } = facility;
    for (let i = 0; i < slots.length; i++) {
      if (
        new Date(slots[i].from).getTime() ==
          request.availableDateFrom.getTime() &&
        new Date(slots[i].to).getTime() == request.availableDateTo.getTime() &&
        !slots[i].available
      ) {
        slots[i].available = true;

        await prisma.facility.update({
          where: { id: request.facilityId },
          data: { ...res, slots },
        });
        return await prisma.request.delete({ where: { id } });
      }
    }
  } else {
    return await prisma.request.delete({ where: { id } });
  }
};

// ------------------------------------------------------------------

export const updateRequest = async (id, data) => {
  const request = await prisma.request.findUnique({
    where: { id },
    include: { user: true, facility: true },
  });

  if (request.type === "Facility") {
    // if cancelling free the slot 
    if (request.status != "Cancelled" && data.status && data.status == "Cancelled") {
      let facility = await prisma.facility.findUnique({
        where: { id: request.facilityId },
      });

      const { slots, ...res } = facility;
      for (let i = 0; i < slots.length; i++) {
        if (
          new Date(slots[i].from).getTime() ==
            request.availableDateFrom.getTime() &&
          new Date(slots[i].to).getTime() ==
            request.availableDateTo.getTime() &&
          !slots[i].available
        ) {
          slots[i].available = true;

          await prisma.facility.update({
            where: { id: request.facilityId },
            data: { ...res, slots },
          });
        }
      }
    }
  }

  if (data.isAdmin) {
    // if admin, notify user 
    delete data.isAdmin;
    await sendNotification({
      usersPushTokens: [request.user.notificationToken],
      title: `Response to ${request.facility.name}`,
      body: "an admin responded to your request",
      data: { respond: true },
    });
  }
  return await prisma.request.update({ where: { id }, data });
};

// -----------------------------------------------------------------

const validateAndTransform = (slot, index) => {
  const fromDate = slot.from.split("T")[0];
  const toTime = slot.to.split("T")[1];
  const toTransformed = `${fromDate}T${toTime}`;
  const fromObject = new Date(slot.from);
  const toObject = new Date(toTransformed);
  if (fromObject > toObject)
    throw `to can't be less than from in slot number ${index}`;
  console.log("kolo tmm ");
  console.log({
    ...slot,
    to: toTransformed,
  });
  return {
    ...slot,
    to: toTransformed,
  };
};
