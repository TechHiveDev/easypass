import { PrismaClient } from "@prisma/client";

// ===============================================================

const prisma = new PrismaClient({
  log: ["info"],
});

// ===============================================================

/**
 * report Scan Report
 */
export const scanReport = async ({ compoundId, start, end, interval }) => {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  // Step up some variables for later
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  end = new Date(+end);
  start = new Date(+start);

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

    // console.log({ from: start, to: end });
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

      tempDate = new Date(+(tempDate.getTime() + diff));
      dates.push(tempDate);
    }

    scans.forEach((scan) => {
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      // fill in the success/fail with their relavent data
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      let index = Math.floor(
        (scan.createdAt.getTime() - start.getTime()) / diff
      );
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
