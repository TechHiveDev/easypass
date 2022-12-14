/**
 * Invitation Controller
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
 *     invitation:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         notes:
 *           type: string
 *
 * tags:
 *   name: invitation
 *
 * /invitation:
 *   get:
 *    summary: Get all invitations
 *    tags: [invitation]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/invitation'
 *
 *   post:
 *     summary: Create invitation
 *     tags: [invitation]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/invitation'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/invitation'
 *
 * /invitation/{id}:
 *   get:
 *     summary: Get invitation by id
 *     tags: [invitation]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/invitation'
 *
 *   put:
 *     summary: Edit invitation
 *     tags: [invitation]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/invitation'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/invitation'
 *
 *   delete:
 *     summary: Delete invitation
 *     tags: [invitation]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/invitation'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";
import { invitationReport } from "./invitation.service";

// ------------------------------------------------------------------

const crudController = {
  ...prismaCrud("invitation"),
  create: null,
};

const customRoutesController = [
  {
    method: "get",
    path: "/invitation-report",
    controller: async (req, res, next) => {
      try {
        const report = await invitationReport(req.query);
        return res.status(202).json(report);
      } catch (err) {
        next(err);
      }
    },
  },
];
// ------------------------------------------------------------------

export default crud("/invitation", crudController, customRoutesController);
