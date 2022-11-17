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
 *   name: request
 *
 * /request:
 *   get:
 *    summary: Get all requests
 *    tags: [request]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/request'
 *
 *   post:
 *     summary: Create request
 *     tags: [request]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/request'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/request'
 *
 * /request/{id}:
 *   get:
 *     summary: Get request by id
 *     tags: [request]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/request'
 *
 *   put:
 *     summary: Edit request
 *     tags: [request]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/request'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/request'
 *
 *   delete:
 *     summary: Delete request
 *     tags: [request]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/request'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";
import {
  getRequestsByCompound,
  getRequestsByUser,
  createRequest,
} from "./request.service";

// ==================================================================
const crudController = {
  ...prismaCrud("request"),
  create: createRequest,
};

// ------------------------------------------------------------------
const customRoutesController = [
  {
    method: "get", // get, post, put, delete  (from express router)
    path: "/request/compound/:id",
    controller: async (req, res, next) => {
      try {
        let facilities = await getRequestsByCompound(+req.params.id);
        res.status(202).json(facilities);
      } catch (err) {
        next(err);
      }
    },
  },
  {
    method: "get", // get, post, put, delete  (from express router)
    path: "/request/user/:id",
    controller: async (req, res, next) => {
      try {
        let facilities = await getRequestsByUser(+req.params.id, req.query);
        res.status(202).json(facilities);
      } catch (err) {
        next(err);
      }
    },
  },
];
// ------------------------------------------------------------------
export default crud("/request", crudController, customRoutesController);