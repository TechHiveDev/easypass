import crudRouter from "./router/crud.router.js";
import prismaOrm from "./orms/prisma.orm";

export const prismaCrud = prismaOrm;
export const crud = crudRouter;
