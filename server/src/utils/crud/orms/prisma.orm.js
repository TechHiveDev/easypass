import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: [
    "info",
    // "query"
  ],
});

// ======================================================

const prismaCrud = (model) => ({
  // --------------------------------------------

  create: async (data) => prisma[model]?.create({ data }),

  // --------------------------------------------

  getOne: async (id) => prisma[model]?.findUnique({ where: { id } }),

  // --------------------------------------------

  getList: async ({ filter, limit, offset, order }) => {
    const count = prisma[model].count();
    const rows = prisma[model].findMany({
      where: filter,
      skip: offset,
      take: limit,
      orderBy: order,
    });

    return Promise.all([count, rows]);
  },

  // --------------------------------------------

  update: async (id, data) => prisma[model].update({ where: { id }, data }),

  // --------------------------------------------

  destroy: async (id) => await prisma[model].delete({ where: { id } }),

  // --------------------------------------------

  search: async ({ q, limit }) => {
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    let entityFields = prisma._dmmf.datamodel.models?.find(
      ({ name }) => name.toLowerCase() === model
    )?.fields;

    let filteredFields = entityFields
      ?.filter(({ type }) => type === "String")
      ?.map(({ name }) => ({
        [name]: { contains: q },
      })) || [{}];

    console.dir({ filteredFields }, { depth: Infinity });

    let where = { OR: [...filteredFields] };

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    return Promise.all([
      prisma[model]?.count(),
      prisma[model].findMany({
        where,
        take: limit,
      }),
    ]);
  },
});

export default prismaCrud;
