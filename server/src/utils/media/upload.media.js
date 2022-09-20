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

// --------------------------------------------------------

const uploadRouter = Router();
const url = process.env.DOMAIN + process.env.PORT;

// --------------------------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { clientId } = req.query;
    const filePath = path.join(__dirname, "../../../assets/client_" + clientId);

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

const uploadController = (req, res) => {
  const { clientId } = req.query;
  //return error if clientId = undefined
  const filePath = req?.files[0]?.filename;
  const url = `/assets/client_${clientId}/${filePath}`;
  console.log({ url });
  res.json({ url });
};

// --------------------------------------------------------

uploadRouter.route("/api/upload").post(uploadMiddleware, uploadController);

// --------------------------------------------------------

export default uploadRouter;
