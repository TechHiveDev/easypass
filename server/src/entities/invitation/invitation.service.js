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
