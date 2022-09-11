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

/**
 *  you can call your orm here ( prisma ) and
 *  return what you want from database
 *
 *  import { PrismaClient } from "@prisma/client";
 *  const prisma = new PrismaClient();
 *
 *  const entityService = {
 *      create: (body) => prisma.user.create({ ...body }),
 *  };
 *
 */

// ------------------------------------------------------------

const exampleService = {
  getList: async (body) => "get list example",

  getOne: async (id) => "get one example",

  create: async (body) => "create example",

  update: async (id, body) => "update example",

  destroy: (id) => "destroy example",

  mario: () => ({ message: "mario example for custom route" }),
};

// ------------------------------------------------------------------

export default exampleService;
