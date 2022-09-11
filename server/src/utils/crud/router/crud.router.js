import { Router } from "express";
import bodyParser from "body-parser";
import controller from "../controller/crud.controller.js";

// ============================================================

/*
 * crud express router
 * params:
 *      path         : /resource  or /resource/:id
 *      orm          : orm crud operations as (prismaCrud)
 *      customRoutes : array of objects [{ method, path, controller }]
 *
 *
 * return : express router
 */
// ============================================================

const crud = (path, orm, customRoutes = []) => {
  const router = Router();
  router.use(bodyParser.json());

  // ------------------------------------

  //  /resource
  router
    .route(path)
    .get(controller.getList(orm.getList, orm.search))
    .post(controller.create(orm.create));

  // ------------------------------------

  //  /resource/:id
  router
    .route(`${path}/:id`)
    .get(controller.getOne(orm.getOne))
    .put(controller.update(orm.update))
    .delete(controller.destroy(orm.destroy));

  // ------------------------------------

  // Custom Routes , Controllers for Entity
  customRoutes?.forEach((custom) =>
    router.route(custom.path)[custom.method](custom.controller)
  );

  return router;
};

// ============================================================

export default crud;
