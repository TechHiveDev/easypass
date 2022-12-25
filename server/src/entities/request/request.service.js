import { PrismaClient } from "@prisma/client";
import { parseQuery } from "../../utils/crud/controller/controller.utils";
// import { sendNotificationFirebase } from "../../utils/notification/firebase";

// ------------------------------------------------------------

const prisma = new PrismaClient();

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
    const { availableDateFrom, availableDateTo, facilityId, type, userType } =
      data;
    if (type === "Facility") {
      if (!IsUserCanUpdateRequest({ requestStatus: "Pending", userType }))
        throw { status: 403, message: "not allowed to create a request" };

      let facility = await prisma.facility.findUnique({
        where: { id: facilityId },
      });

      let { slots, ...res } = facility;

      let newSlots = getSlotToUpdate({
        availableDateFrom,
        availableDateTo,
        slots,
        available: true,
      });

      if (newSlots) {
        await prisma.facility.update({
          where: { id: facilityId },
          data: { ...res, slots: newSlots },
        });
        delete data.userType;
        delete data.requestStatus;
        const newRequest = await prisma.request.create({
          data,
        });
        // await sendNotificationToAssociatedAdmin(facilityId, newRequest);
        return newRequest;
      }
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

  let facility = await prisma.facility.findUnique({
    where: { id: request.facilityId },
  });

  const { slots, ...res } = facility;
  if (!(request.status == "Cancelled" || request.status == "AdminRefused")) {
    // if the request is cancelled, then the slot is already freed
    let freedSlots = getSlotToUpdate({
      available: false,
      availableDateFrom: request.availableDateFrom,
      availableDateTo: request.availableDateTo,
      slots,
    });

    if (freedSlots) {
      await prisma.facility.update({
        where: { id: request.facilityId },
        data: { ...res, slots: freedSlots },
      });
    }
  }
  return await prisma.request.delete({ where: { id } });
};

// ------------------------------------------------------------------

export const updateRequest = async (id, data) => {
  const request = await prisma.request.findUnique({
    where: { id },
    include: { user: true, facility: true },
  });
  if (!request) throw { status: 404, message: `Request not found` };
  // if (request.status == "Cancelled" || request.status == "AdminRefused")
  //   throw { status: 400, message: `Cannot update a Cancelled request` };
  if (data.status) {
    if (
      !IsUserCanUpdateRequest({
        requestStatus: data.status,
        userType: data.userType,
      })
    )
      throw { status: 403, message: `not allowed to ${data.status} a request` };

    let facility = await prisma.facility.findUnique({
      where: { id: request.facilityId },
    });

    const { slots, ...res } = facility;
    let newSlots = getSlotToUpdate({
      available: !(data.status == "Cancelled" || data.status == "AdminRefused"),
      availableDateFrom: request.availableDateFrom,
      availableDateTo: request.availableDateTo,
      slots,
      isPut: true,
    });

    await prisma.facility.update({
      where: { id: request.facilityId },
      data: { ...res, slots: newSlots },
    });
  }

  delete data.userType;
  return await prisma.request.update({ where: { id }, data });
};

// ==================================================================

// Can you delete it if not using it
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

  // await sendNotificationFirebase({
  //   usersPushTokens,
  //   title: "A user requested a service",
  //   body: `user requested a service from ${from} to ${to}`,
  //   data: {
  //     requestId: newRequest.id,
  //   },
  // });
};

// ------------------------------------------------------------------

const getSlotToUpdate = ({
  slots,
  availableDateFrom,
  availableDateTo,
  available,
  isPut = false,
}) => {
  let flag = false;
  for (let i = 0; i < slots.length; i++) {
    if (
      (slots[i].from == availableDateFrom &&
        slots[i].to == availableDateTo &&
        slots[i].available == available) ||
      (typeof availableDateFrom != "string" &&
        new Date(slots[i].from).getTime() == availableDateFrom.getTime() &&
        new Date(slots[i].to).getTime() == availableDateTo.getTime() &&
        slots[i].available == available)
    ) {
      slots[i].available = !slots[i].available;
      flag = true;
    }
  }
  if (!flag && !isPut)
    throw { status: 400, message: "invalid request or no slots available" };
  return slots;
};

// ------------------------------------------------------------------

const IsUserCanUpdateRequest = ({ requestStatus, userType }) => {
  const userTypes = {
    Resident: ["Pending", "Cancelled"],
    Admin: ["AdminRefused", "InProgress", "Completed"],
    SuperAdmin: ["AdminRefused", "InProgress", "Completed"],
    Security: [],
  };
  return userTypes[userType]?.includes(requestStatus);
};

// ------------------------------------------------------------------
