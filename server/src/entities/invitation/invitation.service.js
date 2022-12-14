/**
 *  Entity Service
 * ------------------------------------
 * this module aim to carry custom bussniess logic
 * for entity if entity not just CRUD
 *
 * you can add here any bussiness logic you need
 * and will be calls from entity controller
 *
 * Entity Flow
 * router --> controller --> service --> controller
 *
 */

// ------------------------------------------------------------

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info"] });

// ------------------------------------------------------------

const invitationService = {
  create: async ({ userId, name, type, compoundId, expiresAt, notes = "" }) => {
    return await prisma.invitation.create({
      data: {
        userId: +userId,
        type,
        name,
        compoundId,
        expiresAt,
        notes,
      },
    });
  },
};

// ------------------------------------------------------------------

export default invitationService;

/**
 * report invitation Report
 */
export const invitationReport = async ({
  compoundId,
  start,
  end,
  interval,
}) => {
  //NOTE: interval is enum (1=>day)
  //                       (7=>week)
  //                       (30=>month)
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  // Step up some variables for later
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  end = new Date(+end);
  start = new Date(+start);

  let typeOfInterval = interval;

  if (interval == 30) {
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    // if it's by month round the start day to the first day of the month and the end day to the end of the month
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    start = new Date(start.getFullYear(), start.getMonth(), 1);
    end = new Date(end.getFullYear(), end.getMonth() + 1, 0);
  }

  let newInterval =
    interval == 30
      ? 60 * 60 * 1000 * 24 * 32
      : interval == 7
      ? 60 * 60 * 1000 * 24 * 8
      : 60 * 60 * 1000 * 24 * 1;

  interval = Math.ceil((end.getTime() - start.getTime()) / newInterval);

  let diff = (end.getTime() - start.getTime()) / interval;

  if (!start || !start || !end || !interval)
    throw {
      status: 400,
      message: "start date, end date, interval are required",
    };

  if (!compoundId) {
    let compoundIds = await prisma.compound.findMany({ select: { id: true } });
    compoundId = compoundIds.map(({ id }) => id);
  } else if (typeof compoundId != "object") {
    compoundId = [compoundId];
  }
  let res = [];
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  // for a compound get 1- invitations between specificed period
  //                    2- compound id, name
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  for await (let id of compoundId) {
    const component = await prisma.compound.findFirst({ where: { id: +id } });
    if (!component) continue;

    const invitations = await prisma.invitation.findMany({
      where: {
        compoundId: +id,
        createdAt: {
          lte: end,
          gte: start,
        },
      },
    });

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    // initiate visitor and delivery with 0'z
    // generate dates intervals based on start and end date
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    let visitor = [];
    let all = [];
    let delivery = [];
    let dates = [];
    let tempDate = start;
    for (let index = 0; index < interval; index++) {
      visitor[index] = 0;
      delivery[index] = 0;
      all[index] = 0;

      dates.push(tempDate.toISOString());
      if (typeOfInterval == 30) {
        tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1));
        // new Date(tempDate.setMonth(tempDate.getMonth() + 1))
      } else {
        tempDate = new Date(+(tempDate.getTime() + diff));
      }
    }

    invitations.forEach((invitation) => {
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      // fill in the visitor/delivery with their relavent data
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      let index = 0;

      if (typeOfInterval == 30) {
        let diffInMonth =
          invitation.createdAt.getMonth() - start.getMonth() + 1;
        index = diffInMonth < 0 ? diffInMonth + 12 : diffInMonth;
      } else {
        index = Math.floor(
          (invitation.createdAt.getTime() - start.getTime()) / diff
        );
      }

      if (!visitor[index]) visitor[index] = 0;
      if (!delivery[index]) delivery[index] = 0;
      if (!all[index]) all[index] = 0;
      if (invitation.type == "Visitor") visitor[index] += 1;
      else delivery[index] += 1;
      all[index] += 1;
    });

    res.push({
      component: { name: component.name, id: component.id },
      report: { visitor, delivery, all, dates },
    });
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  return res;
};

// ===============================================================
