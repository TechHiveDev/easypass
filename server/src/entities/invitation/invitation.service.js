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

import { encryptWithPublicKey } from "../../utils/cryptography/cryptography";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: [
    "info",
    // "query"
  ],
});

// ------------------------------------------------------------

const invitationService = {
  create: async (body) => {
    console.log(body);
    const invitation = await prisma.invitation.create({ data: body });
    return {
      invitation,
      encryptedInvitation: encryptWithPublicKey(invitation),
    };
  },
};

// ------------------------------------------------------------------

export default invitationService;
