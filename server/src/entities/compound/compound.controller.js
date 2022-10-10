/**
 * Compound Controller
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
 *     compound:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         logoUrl:
 *           type: string
 *         location:
 *           type: string
 *
 * tags:
 *   name: compound
 *
 * /compound:
 *   get:
 *    summary: Get all compounds
 *    tags: [compound]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/compound'
 *
 *   post:
 *     summary: Create compound
 *     tags: [compound]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/compound'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/compound'
 *
 * /compound/{id}:
 *   get:
 *     summary: Get compound by id
 *     tags: [compound]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/compound'
 *
 *   put:
 *     summary: Edit compound
 *     tags: [compound]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/compound'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/compound'
 *
 *   delete:
 *     summary: Delete compound
 *     tags: [compound]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/compound'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";

// ------------------------------------------------------------------

export default crud("/compound", prismaCrud("compound"));
