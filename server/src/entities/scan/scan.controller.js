/**
 * Scan Controller
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
 *     scan:
 *       type: object
 *       properties:
 *
 * tags:
 *   name: scan
 *
 * /scan:
 *   get:
 *    summary: Get all scans
 *    tags: [scan]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/scan'
 *
 *   post:
 *     summary: Create scan
 *     tags: [scan]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/scan'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/scan'
 *
 * /scan/{id}:
 *   get:
 *     summary: Get scan by id
 *     tags: [scan]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/scan'
 *
 *   put:
 *     summary: Edit scan
 *     tags: [scan]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/scan'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/scan'
 *
 *   delete:
 *     summary: Delete scan
 *     tags: [scan]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/scan'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";
import {
  generateGuestQrCodeInvitationLink,
  generateResidentQrCode,
} from "./services/createQrCode.service";
import { scanQrCode } from "./services/scanQrCode.service";
// ------------------------------------------------------------------

const crudController = {
  ...prismaCrud("scan"),
  getList: null,
  getOne: null,
  create: null,
  update: null,
  destroy: null,
};

// ------------------------------------------------------------------

const customRoutesController = [
  {
    method: "post",
    path: "/generate-resident-qrcode",
    controller: async (req, res, next) => {
      try {
        const encryptedQrcode = await generateResidentQrCode(req.body);
        return res.status(202).json({ encryptedQrcode });
      } catch (err) {
        next(err);
      }
    },
  },

  //  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  {
    method: "post",
    path: "/generate-guest-link",
    controller: async (req, res, next) => {
      try {
        const qrcode = await generateGuestQrCodeInvitationLink(req.body);
        return res.status(202).json({ qrcode });
      } catch (err) {
        next(err);
      }
    },
  },

  //  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  {
    method: "post",
    path: "/scan-qrcode",
    controller: async (req, res, next) => {
      try {
        const encryptedQrcode = await scanQrCode(req.body);
        return res.status(202).json({ encryptedQrcode });
      } catch (err) {
        next(err);
      }
    },
  },

  //  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
];

// ------------------------------------------------------------------

export default crud("/scan", crudController, customRoutesController);
