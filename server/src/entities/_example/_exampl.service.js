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

const exampleService = {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  create: async (body) => prisma.user.create({ ...body }),

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  mario: () => "mario example for custom route ",

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
};

// ------------------------------------------------------------------
