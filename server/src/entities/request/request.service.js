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

import { sendNotificationExpo } from "../../utils/notification/expo.js";
import { sendNotificationFirebase } from "../../utils/notification/firebase";

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
    const { availableDateFrom, availableDateTo, facilityId, type } = data;
    if (type === "Facility") {
      let facility = await prisma.facility.findUnique({
        where: { id: facilityId },
      });

      let { slots, ...res } = facility;
      let newRequest;

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

          newRequest = await prisma.request.create({
            data,
          });
        }
      }
      if (newRequest) {
        await sendNotificationToAssociatedAdmin(facilityId, newRequest);
        return newRequest;
      } else
        throw { status: 400, message: "invalid request or no slots available" };
    } else {
      return await prisma.request.create(data);
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
        !slots[i].available &&
        request.status !== "Cancelled"
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
    if (
      request.status != "Cancelled" &&
      data.status &&
      data.status == "Cancelled"
    ) {
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
    await sendNotificationExpo({
      usersPushTokens: [request.user.notificationToken],
      title: `Response to ${request.facility.name}`,
      body: `admin: ${data.respondNote}`,
      data: { respond: true, requestId: request.id },
    });
  }
  return await prisma.request.update({ where: { id }, data });
};

// ------------------------------------------------------------------

const sendNotificationToAssociatedAdmin = async (facilityId, newRequest) => {
  const facility = await prisma.facility.findFirst({
    where: {
      id: facilityId,
    },
    select: {
      compound: {
        select: {
          id: true,
        },
      },
    },
  });

  const usersPushTokens = await prisma.userCompound
    .findMany({
      where: {
        compoundId: facility.compound.id,
        user: {
          OR: [{ type: "Admin" }, { type: "SuperAdmin" }],
        },
      },
      select: {
        user: {
          select: {
            notificationToken: true,
          },
        },
      },
    })
    ?.then((data) =>
      data.map(({ user: { notificationToken } }) => notificationToken)
    );

  const from = newRequest.availableDateFrom.toISOString().slice(0, 10);
  const to = newRequest.availableDateTo.toISOString().slice(0, 10);

  await sendNotificationFirebase({
    usersPushTokens,
    title: "A user requested a service",
    body: `user requested a service from ${from} to ${to}`,
    data: {
      requestId: newRequest.id,
    },
  });
};
