/**
 *  Prisma Error Hadndler Middleware
 *
 * aims to follow prisma convention to catch errors
 * and send it formatted
 *
 */

// ---------------------------------------------------------------

import PrismaErrors from "./prismaErrors";

// ---------------------------------------------------------------

const extractPrismaMissingArguments = (error, readableError) => {
  const regex = /(?<=Argument )(.*)(?= for)/g;
  let match;
  let extracts = new Set();

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  while ((match = regex.exec(error?.message)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) regex.lastIndex++;
    match.forEach((match) => extracts.add(match));
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  // Append Error extracts to error message
  extracts = [...extracts];
  if (extracts.length) {
    extracts?.map((extract, index) => {
      readableError += `${extract}`;
      if (index < extracts.length - 1) {
        readableError += ", ";
      }
    });
    readableError += " is Required !";
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return readableError;
};

// ---------------------------------------------------------------

const prettyViolationErrorMessage = (error, readableError) => {
  const { code, meta } = error;
  const name = PrismaErrors.codeToName[code];

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  /**
   * Just Change CamelCase to Title Case
   * Peffered to Localized  nad informative than just be pretty
   */
  if (code) {
    const result = name?.replace(/([A-Z])/g, " $1");
    readableError = result?.charAt(0)?.toUpperCase() + result?.slice(1);
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (meta?.target) readableError += " on : " + meta.target;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return readableError;
};

// ---------------------------------------------------------------

const prismaErrorHandler = (error, req, res, next) => {
  const { code } = error;
  const name = PrismaErrors.codeToName[code];
  let readableError = "";

  // // ---------------------------------------------

  readableError = prettyViolationErrorMessage(error, readableError);

  // ---------------------------------------------

  readableError = extractPrismaMissingArguments(error, readableError);

  // ---------------------------------------------

  const message = readableError ? readableError : "Bad Request";

  // ---------------------------------------------

  console.error(error?.message);

  // ---------------------------------------------

  res.status(400).json({
    name,
    message,
    status: 400,
  });
};

// ------------------------------------------------

export default prismaErrorHandler;
