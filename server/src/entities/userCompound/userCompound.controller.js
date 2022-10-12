/**
 * UserCompound Controller
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
 *     userCompound:
 *       type: object
 *       properties:
 *
 * tags:
 *   name: userCompound
 *
 * /userCompound:
 *   get:
 *    summary: Get all userCompounds
 *    tags: [userCompound]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/userCompound'
 *
 *   post:
 *     summary: Create userCompound
 *     tags: [userCompound]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userCompound'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userCompound'
 *
 * /userCompound/{id}:
 *   get:
 *     summary: Get userCompound by id
 *     tags: [userCompound]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userCompound'
 *
 *   put:
 *     summary: Edit userCompound
 *     tags: [userCompound]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userCompound'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/userCompound'
 *
 *   delete:
 *     summary: Delete userCompound
 *     tags: [userCompound]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userCompound'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";

export default crud("/userCompound", prismaCrud("userCompound"));
