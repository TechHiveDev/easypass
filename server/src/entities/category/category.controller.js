/**
 * Category Controller
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
 *     category:
 *       type: object
 *       properties:
 *         ip:
 *           type: string
 *
 * tags:
 *   name: category
 *
 * /category:
 *   get:
 *    summary: Get all categorys
 *    tags: [category]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/category'
 *
 *   post:
 *     summary: Create category
 *     tags: [category]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/category'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/category'
 *
 * /category/{id}:
 *   get:
 *     summary: Get category by id
 *     tags: [category]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/category'
 *
 *   put:
 *     summary: Edit category
 *     tags: [category]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/category'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/category'
 *
 *   delete:
 *     summary: Delete category
 *     tags: [category]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/category'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";
import { getDiscoverCompound } from "./category.service";

// ------------------------------------------------------------------

const crudController = { ...prismaCrud("category") };

// ------------------------------------------------------------------

const customRoutesController = [
  {
    method: "get",
    path: "/category/compound/:id",
    controller: async (req, res, next) => {
      try {
        let data = await getDiscoverCompound(+req.params.id);
        res.status(202).json(data);
      } catch (err) {
        next(err);
      }
    },
  },
];

export default crud("/category", crudController, customRoutesController);
