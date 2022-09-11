import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import errors from "./src/utils/error/errorHandler.middlerware";
import swagger from "./src/utils/swaggerDocs/swagger.middleware";

// ------------------------------------------------------

// Entities controllers imports
import compoundController from "./src/entities/compound/compound.controller.js";
import userController from "./src/entities/user/user.controller.js";
import userCompoundController from "./src/entities/userCompound/userCompound.controller.js";
import invitationController from "./src/entities/invitation/invitation.controller.js";
import scanController from "./src/entities/scan/scan.controller.js";
import deviceController from "./src/entities/device/device.controller.js";
import _exampleController from "./src/entities/_example/_example.controller.js";

// ------------------------------------------------------

const app = express();

// ------------------------------------------------------

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ------------------------------------------------------

// Entities contollers use
app.use(compoundController);
app.use(userController);
app.use(userCompoundController);
app.use(invitationController);
app.use(scanController);
app.use(deviceController);
app.use(_exampleController);

// Swagger Documentaion Middleware
app.use("/api-docs", swagger.server, swagger.setup); // Docs

// ------------------------------------------------------

// Error Handlers
app.use(errors.catchNotFound);
app.use(errors.errorHandler);

//---------------------------------------------------

export default app;
