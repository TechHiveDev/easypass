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
import ejs from "ejs";

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
import deviceController from "./src/entities/device/device.controller.js";
import qrcodeRouter from "./src/utils/QRCode/qrcode.router";

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
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/entitites/qrcode"));

// ------------------------------------------------------

// Swagger Documentaion Middleware
app.use("/api-docs", swagger.server, swagger.setup); // Docs

// ------------------------------------------------------

// QRCode Route {{basepath}}/guest/:encryptedInvitation
app.use(qrcodeRouter);

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

// ------------------------------------------------------

// Error Handlers
app.use(errors.catchNotFound);
app.use(errors.errorHandler);

//---------------------------------------------------

export default app;
