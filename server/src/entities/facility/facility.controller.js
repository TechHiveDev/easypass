/**
 * User Controller
 * -------------------------------------------------------
 *
 * you can recap the architecture of entity controller and how
 * to overide the controller and the service at _example
 *   ./src/entites/_example/_example.controller.js
 *   ./src/entites/_example/_example.service.js
 *
 */

// ---------------------------------------------

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         photoUrl:
 *           type: string
 *
 *
 * tags:
 *   name: facility
 *
 * /facility:
 *   get:
 *    summary: Get all facilitys
 *    tags: [facility]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/facility'
 *
 *   post:
 *     summary: Create facility
 *     tags: [facility]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/facility'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/facility'
 *
 * /facility/{id}:
 *   get:
 *     summary: Get facility by id
 *     tags: [facility]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/facility'
 *
 *   put:
 *     summary: Edit facility
 *     tags: [facility]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/facility'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/facility'
 *
 *   delete:
 *     summary: Delete facility
 *     tags: [facility]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/facility'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";
import { getFacilitiesByCompound, createFacility, updateFacility } from "./facility.service";

// ==================================================================
const crudController = {
  ...prismaCrud("facility"),
  create: createFacility,
  update: updateFacility,
};

// ------------------------------------------------------------------
const customRoutesController = [
  {
    method: "get", // get, post, put, delete  (from express router)
    path: "/facility/compound/:id",
    controller: async (req, res, next) => {
      try {
        let facilities = await getFacilitiesByCompound(+req.params.id);
        res.status(202).json(facilities);
      } catch (err) {
        next(err);
      }
    },
  },
];
// ------------------------------------------------------------------
export default crud("/facility", crudController, customRoutesController);
