import createHttpError from "http-errors";
import prismaErrorHandler from "./primsaErrorHanlder.middleware";

// ------------------------------------------------------------------

const catchNotFound = (_, __, next) => next(createHttpError(404));

// ------------------------------------------------------------------

const errorHandler = (error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  // Prisma Error
  if (error?.name === "Error") {
    return prismaErrorHandler(error, req, res, next);
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  let errorJson = {
    status: error?.status || 500,
    url: req?.originalUrl,
    method: req?.method,
    name: error?.name,
    message: error?.message || "Some thing Wrong Happened Check Ther Server",
    // stack: error?.stack || "",
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  console.error("*** Caught Error ***" + "*".repeat(40));
  console.error({ error });
  console.error({ errorJson });
  console.error("*".repeat(60));

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  res.status(errorJson?.status).json(errorJson);
};

// ------------------------------------------------------------------

export default { catchNotFound, errorHandler };
