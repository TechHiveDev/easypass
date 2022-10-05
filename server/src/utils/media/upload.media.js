/**
 * Upload Media Module
 *
 * upload media for express server using multer,
 * this example shows how to upload only signle image
 *
 * @author MarioMonir
 */

// --------------------------------------------------------

import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import { PrismaClient } from "@prisma/client";

// ---------------------------------------------------------

const prisma = new PrismaClient({ log: ["info" /* "query" */] });

// --------------------------------------------------------

const uploadRouter = Router();

let baseUrl;

if (process.env.NODE_ENV === "development") {
  baseUrl = process.env.DOMAIN + process.env.PORT;
} else {
  baseUrl = process.env.DOMAIN;
}

// --------------------------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.query;
    const { entity } = req.params;

    const filePath = path.join(
      __dirname,
      `../../../assets/${entity}/${entity}_${id?id:""}`
    );

    // Create containing folder if it doesn't exist'
    const folderPath = path.join(__dirname, `../../../assets/${entity}`);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Create folder if it doesn't exist'
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
    // cb(null, "assets/");
    req.file = filePath;
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    req.file = cb(null, Date.now() + "_" + file.originalname);
  },
});

// --------------------------------------------------------

const uploadMiddleware = multer({ storage }).any();
//.single("avatar");

// --------------------------------------------------------

const uploadController = async (req, res, next) => {
  const { id } = req.query;
  const { entity } = req.params;

  // if (!id)
  //   return res
  //     .status(400)
  //     .send({ success: false, message: "Id and entity are not supplied" });

  const filePath = req?.files[0]?.filename;
  const url = baseUrl + `/assets/${entity}/${entity}_${id?id:""}/${filePath}`;
  res.status(202).json({ url });
};

// --------------------------------------------------------

uploadRouter
  .route("/api/upload/:entity")
  .post(uploadMiddleware, uploadController);

// --------------------------------------------------------

export default uploadRouter;
