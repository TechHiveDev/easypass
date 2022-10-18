import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import errors from "./src/utils/error/errorHandler.middlerware";
import swagger from "./src/utils/swagger-docs/swagger.middleware";
import passport from "passport";
import cookieSession from "cookie-session";
import { cookiesConfigs, corsConfigs } from "./src/utils/configs/configs";
import compoundUnprotectedController from "./src/entities/compound/compound.unprotected.controller";
import uploadRouter from "./src/utils/media/upload.media";

// ------------------------------------------------------

// Auth
import authRouter from "./src/utils/auth/passport/passport.router.auth";
import passportAuthenticate from "./src/utils/auth/passport/passport.auth";

// ------------------------------------------------------

// Entities controllers imports
import compoundController from "./src/entities/compound/compound.controller.js";
import userController from "./src/entities/user/user.controller.js";
import userCompoundController from "./src/entities/userCompound/userCompound.controller.js";
import invitationController from "./src/entities/invitation/invitation.controller.js";
import scanController from "./src/entities/scan/scan.controller.js";
import scanUnprotectedController from "./src/entities/scan/scan.unprotected.controller";
import deviceController from "./src/entities/device/device.controller.js";
import announcementController from "./src/entities/announcement/announcement.controller";
import facilityController from "./src/entities/facility/facility.controller";
import requestController from "./src/entities/request/request.controller";

// ------------------------------------------------------

const app = express();

// ------------------------------------------------------

// Middlewares ( web )
app.use(cors(corsConfigs));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieSession(cookiesConfigs));
app.use(passport.initialize());
app.use(passport.session());

// ------------------------------------------------------

// set ejs engine
app.set("views", path.join(__dirname, "./src/entities/scan"));
app.set("view engine", "ejs");

// Static Files ( Uploaded Images )
app.use("/assets", express.static(path.join(__dirname, "/assets")));

// ------------------------------------------------------

// Swagger Documentaion Middleware
app.use("/api-docs", swagger.server, swagger.setup); // Docs

// ------------------------------------------------------

// Custom Middleware to remove null values on the requst body
// TODO: Refactor
app.use((req, res, next) => {
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      if (req.body[key] == null) delete req.body[key];
    }
  }
  next();
});

// ------------------------------------------------------

// Un-Protected Route
app.use(compoundUnprotectedController);
app.use(scanController);
app.use(scanUnprotectedController);

// ------------------------------------------------------

// Auth Router ( login / register )
app.use(authRouter);

// Auth Passport Protect Middleware
app.use(passportAuthenticate(passport));

// ------------------------------------------------------

// Entities contollers use
app.use(compoundController);
app.use(userController);
app.use(userCompoundController);
app.use(invitationController);
app.use(scanController);
app.use(deviceController);
app.use(announcementController);
app.use(facilityController);
app.use(requestController);

// ------------------------------------------------------

// Upload Media Files
app.use(uploadRouter);

// ------------------------------------------------------

// Error Handlers
app.use(errors.catchNotFound);
app.use(errors.errorHandler);

//---------------------------------------------------

export default app;
