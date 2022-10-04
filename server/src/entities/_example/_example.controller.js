/**
 * Entity Controller
 * -------------------------------------------------------
 * => getList , getOne , create , update , destroy
 *
 *
 * you can simply overide this controller
 * functions (one or more ) as following :
 * -------------------------------------------------------
 *
 * crud("/entitiy", {
 *    ...prismaCrud("entitiy") ,
 *    getList: ({ filter, limit, offset, order }) => Promise,
 *    getOne: id => Promise,
 *    create: body => Promise,
 *    update: (id, body) => Promise,
 *    destroy: id => Promise ,
 * },
 * 
 * // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
 * 
 * // Custom Routes
 * [
 *  {
 *    method: "get",                        // http request ( get, post, put, delete, patch , ... )
 *    path: "/mario",                       // independent of eniity path
 *    controller: (req, res, next) => {
 *       let customServiceResponse = entityService.mario();
 *       res.status(202).json({ message: customServiceResponse });
 *    },
 *  }
 * ])
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";
import exampleService from "./_example.service";

// ------------------------------------------------------------------

/**
 *  NOTE :
 *    for sure for this example the prisma curds will not work because
 *    no model in database called exmaple
 *
 */

// ------------------------------------------------------------------

const crudController = {
  ...prismaCrud("example"),
  getList: exampleService.getList,

};

// ------------------------------------------------------------------
const customRoutesController = [
  {
    method: "get", // get, post, put, delete  (from express router)
    path: "/mario",
    controller: (req, res, next) => {
      let customRes = exampleService.mario();
      res.status(202).json({ message: customRes });
    },
  },
];

// ------------------------------------------------------------------

export default crud("/example", crudController, customRoutesController);
