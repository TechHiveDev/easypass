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
 *   name: discover
 *
 * /discover:
 *   get:
 *    summary: Get all discovers
 *    tags: [discover]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/discover'
 *
 *   post:
 *     summary: Create discover
 *     tags: [discover]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/discover'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/discover'
 *
 * /discover/{id}:
 *   get:
 *     summary: Get discover by id
 *     tags: [discover]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/discover'
 *
 *   put:
 *     summary: Edit discover
 *     tags: [discover]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/discover'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/discover'
 *
 *   delete:
 *     summary: Delete discover
 *     tags: [discover]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/discover'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";
import {
  getDiscoverByCompound,
  createDiscover,
} from "./discover.service";

// ==================================================================
const crudController = {
  ...prismaCrud("discover"),
};

// ------------------------------------------------------------------
const customRoutesController = [
  {
    method: "get", // get, post, put, delete  (from express router)
    path: "/discover/compound/:id",
    controller: async (req, res, next) => {
      try {
        let discovers = await getDiscoverByCompound(+req.params.id);
        res.status(202).json(discovers);
      } catch (err) {
        next(err);
      }
    },
  },

  // ------------------------------------------------------------------

  {
    method: "post",
    path: "/discover/create",
    controller: async (req, res, next) => {
      try {
        let discovers = await createDiscover(req.user.id, req.body);
        res.status(202).json(discovers);
      } catch (err) {
        next(err);
      }
    },
  },
];
// ------------------------------------------------------------------
export default crud("/discover", crudController, customRoutesController);
