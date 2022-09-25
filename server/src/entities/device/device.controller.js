/**
 * Device Controller
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
 *     device:
 *       type: object
 *       properties:
 *         ip:
 *           type: string
 *
 * tags:
 *   name: device
 *
 * /device:
 *   get:
 *    summary: Get all devices
 *    tags: [device]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/device'
 *
 *   post:
 *     summary: Create device
 *     tags: [device]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/device'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/device'
 *
 * /device/{id}:
 *   get:
 *     summary: Get device by id
 *     tags: [device]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/device'
 *
 *   put:
 *     summary: Edit device
 *     tags: [device]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/device'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/device'
 *
 *   delete:
 *     summary: Delete device
 *     tags: [device]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/device'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";

// ------------------------------------------------------------------

export default crud("/device", prismaCrud("device"));
