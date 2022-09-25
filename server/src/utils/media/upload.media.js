/**
 * Upload Media Module
 *
 * upload media for express server using multer,
 * this example shows how to upload only signle image
 *
 * @author MarioMonir
 */

// --------------------------------------------------------

// TODO :
// folder for profiles photo
// folder for compound images
// folder for compounds facilities

import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import { PrismaClient } from "@prisma/client";

// ---------------------------------------------------------

const prisma = new PrismaClient({ log: ["info" /* "query" */] });

// --------------------------------------------------------

const uploadRouter = Router();
const url = process.env.DOMAIN + process.env.PORT;

// --------------------------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { clientId } = req.query;
    const filePath = path.join(
      __dirname,
      "../../../assets/avatars/client_" + clientId
    );

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

const uploadController = async (req, res) => {
  const { clientId } = req.query;
  if (!clientId)
    return { success: false, message: "Client Id is not supplied" };
  const filePath = req?.files[0]?.filename;
  const url = `/assets/avatars/client_${clientId}/${filePath}`;
  const findUser = await prisma.user.update({
    where: { id: parseInt(clientId) },
    data: {
      photoUrl: url,
    },
  });

  res.json({ url });
};

// --------------------------------------------------------

uploadRouter.route("/api/upload").post(uploadMiddleware, uploadController);

// --------------------------------------------------------

export default uploadRouter;
