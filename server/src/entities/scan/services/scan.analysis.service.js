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
  end = new Date(+end);
  start = new Date(+start);

  if (typeof compoundId != "object") {
    compoundId = [compoundId];
  }
  let res = [];

  for await (let id of compoundId) {
    const component = await prisma.compound.findFirst({ where: { id: +id } });

    // const sucessfulScans = await prisma.scan.findMany({
    //   where: { success: true, compoundId: +id },
    //   select: { createdAt: true },
    // });
    // const failedScans = await prisma.scan.findMany({
    //   where: { success: false, compoundId: +id },
    //   select: { createdAt: true },
    // });
    // res.push({
    //   compound: { id: component.id, name: component.name },
    //   success: sucessfulScans,
    //   fail: failedScans,
    // });
    console.log({ from: new Date(+start), to: new Date(+end) });
    const scans = await prisma.scan.findMany({
      where: {
        compoundId: +id,
        createdAt: {
          lte: end,
          gte: start,
        },
      },
    });
    console.log(scans);

    let success = Array(interval).fill(0);
    let fail = Array(interval).fill(0);

    scans.forEach((scan) => {
      if (scan.success) {
        // let diff = Number(scan.createdAt.getTime() - start.getTime());
        console.log(scan.createdAt.getTime());
        // console.log(diff / interval);
        // success[  ]+=1
      }
    });
  }
  return res;
};

// ===============================================================
