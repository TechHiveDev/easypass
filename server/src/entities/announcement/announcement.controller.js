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
 *   name: announcement
 *
 * /announcement:
 *   get:
 *    summary: Get all announcements
 *    tags: [announcement]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/announcement'
 *
 *   post:
 *     summary: Create announcement
 *     tags: [announcement]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/announcement'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/announcement'
 *
 * /announcement/{id}:
 *   get:
 *     summary: Get announcement by id
 *     tags: [announcement]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/announcement'
 *
 *   put:
 *     summary: Edit announcement
 *     tags: [announcement]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/announcement'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/announcement'
 *
 *   delete:
 *     summary: Delete announcement
 *     tags: [announcement]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/announcement'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";
import { getAnnouncementByCompound, createAnnouncement } from "./announcement.service";

// ==================================================================
const crudController = {
  ...prismaCrud("announcement"),
};

// ------------------------------------------------------------------
const customRoutesController = [
  {
    method: "get", // get, post, put, delete  (from express router)
    path: "/announcement/compound/:id",
    controller: async (req, res, next) => {
      try {
        let announcements = await getAnnouncementByCompound(+req.params.id);
        res.status(202).json(announcements);
      } catch (err) {
        next(err);
      }
    },
  },

  // ------------------------------------------------------------------

  {
    method: "post",
    path: "/announcement/create",
    controller: async (req, res, next) => {
      try {
        let announcements = await createAnnouncement(req.user.id, req.body);
        res.status(202).json(announcements);
      } catch (err) {
        next(err);
      }
    },
  },
];
// ------------------------------------------------------------------
export default crud("/announcement", crudController, customRoutesController);
