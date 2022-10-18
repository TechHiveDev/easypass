import { PrismaClient } from "@prisma/client";

// ===============================================================

const prisma = new PrismaClient({
  log: ["info"],
});

// ===============================================================
/**
 * report Scan Report
 * @author sergi-s
 * if didn't refactor with 'day.js' contact me
 * @link https://github.com/sergi-s
 */
export const scanReport = async ({ compoundId, start, end, interval }) => {
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
  // for a compound get 1- scans between specificed period
  //                    2- compound id, name
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  for await (let id of compoundId) {
    const component = await prisma.compound.findFirst({ where: { id: +id } });
    if (!component) continue;

    const scans = await prisma.scan.findMany({
      where: {
        compoundId: +id,
        createdAt: {
          lte: end,
          gte: start,
        },
      },
    });

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    // initiate success and fail with 0'z
    // generate dates intervals based on start and end date
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    let success = [];
    let fail = [];
    let dates = [];
    let tempDate = start;
    for (let index = 0; index < interval; index++) {
      success[index] = 0;
      fail[index] = 0;

      dates.push(tempDate.toISOString());
      if (typeOfInterval == 30) {
        tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1));
        // new Date(tempDate.setMonth(tempDate.getMonth() + 1))
      } else {
        tempDate = new Date(+(tempDate.getTime() + diff));
      }
    }

    scans.forEach((scan) => {
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      // fill in the success/fail with their relavent data
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      let index = 0;

      if (typeOfInterval == 30) {
        let diffInMonth = scan.createdAt.getMonth() - start.getMonth() + 1;
        index = diffInMonth < 0 ? diffInMonth + 12 : diffInMonth;
      } else {
        index = Math.floor((scan.createdAt.getTime() - start.getTime()) / diff);
      }

      if (!success[index]) success[index] = 0;
      if (!fail[index]) fail[index] = 0;
      if (scan.success) success[index] += 1;
      else fail[index] += 1;
    });

    res.push({
      component: { name: component.name, id: component.id },
      report: { success, fail, dates },
    });
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  return res;
};

// ===============================================================
