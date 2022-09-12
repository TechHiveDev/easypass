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

import lodash from "lodash";
import { decryptWithPrivateKey } from "../../utils/cryptography/cryptography";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: [
    "info",
    // "query"
  ],
});

// ------------------------------------------------------------

const scanService = {
  create: async (body) => {
    const decryptedInvitation = decryptWithPrivateKey(body.invitation);

    const invitation = await prisma.invitation.findUnique({
      where: { id: decryptedInvitation.id },
    });

    console.log(
      { decryptedInvitation },
      { invitation },
      JSON.stringify(invitation) === JSON.stringify(decryptedInvitation)
    );

    return prisma.scan.create({
      data: {
        deviceId: body.deviceId,
        invitationId: decryptedInvitation.id,
        success:
          JSON.stringify(invitation) === JSON.stringify(decryptedInvitation),
      },
    });
  },
};

// ------------------------------------------------------------------

export default scanService;
