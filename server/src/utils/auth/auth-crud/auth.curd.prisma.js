/**
 *  Auth crud
 *  ----------
 *  this module aims to have the functions that
 *  calls the database from a single point (this file)
 *  and these functions are used in auth process as
 *
 *  orm used are prisma
 *
 *  1 - find user by email          => findUser
 *  2 - find user by id             => findUserById
 *  3 - find or create google user  => findOrCreateGoogleUser
 *  4 - get user for inital state   => getUser
 *  5 - login ( find then get user ) => login
 *
 */

// ---------------------------------------------------------

import { hash, verifyHash } from "../../cryptography/hashing";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

// ---------------------------------------------------------

const prisma = new PrismaClient({ log: ["info" /* "query" */] });

// ---------------------------------------------------------

export const createUserAndAddress = async (payload) => {
  const expectedUserBody = [
    "email",
    "name",
    "password",
    "phone",
    "type",
    // "active",
  ];

  const expectedResiendtBody = [
    // "compoundName",
    "compoundId",
    "streetName",
    "blockNumber",
    "unitNumber",
  ];

  // check the body is verfied ( need joi validation )
  for (let item of expectedUserBody) {
    if (item && !payload[item]) {
      throw { status: 400, message: `${item} is required!` };
    }
  }

  const { type } = payload;

  // check resident address is completed
  if (type === "Resident") {
    for (let item of expectedResiendtBody) {
      if (item && !payload[item]) {
        throw { status: 400, message: `${item} is required!` };
      }
    }
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const {
    email,
    name,
    phone,
    password,
    // compoundName,
    compoundId,
    streetName,
    blockNumber,
    unitNumber,
    photoUrl,
    active = false,
  } = payload;

  const compound = await prisma.compound.findFirst({
    where: {
      // name: compoundName,
      id: +compoundId,
    },
  });

  if (!compound?.id) {
    throw { status: 400, message: "No Compound with this id" };
  }

  let compundUserPayload = {};

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (type === "Resident") {
    compundUserPayload = {
      userCompound: {
        create: {
          compoundId: compound?.id,
          streetName,
          blockNumber: +blockNumber,
          unitNumber: +unitNumber,
        },
      },
    };
  } else if (type === "Security" || type === "Admin") {
    compundUserPayload = {
      userCompound: {
        create: {
          compoundId: compound?.id,
        },
      },
    };
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return prisma.user.create({
    data: {
      name,
      photoUrl,
      email,
      phone,
      type,
      active,
      password: hash({ password }),
      ...compundUserPayload,
    },
  });
};

// ---------------------------------------------------------

export const findUserById = async ({ id }) => {
  if (!id) return false;
  return await prisma.user.findUnique({ where: { id } });
};

// ---------------------------------------------------------

export const findOrCreateGoogleUser = async (payload) => {
  let user = await prisma.user.findUnique({
    where: { googleId: payload?.googleId },
  });

  if (!user) {
    user = await prisma.user.create({ data: payload });
  }

  return user;
};

// ---------------------------------------------------------------

export const findOrCreateGithubUser = async (payload) => {
  let user = await prisma.user.findUnique({
    where: { githubId: payload?.githubId },
  });

  if (!user) {
    user = await prisma.user.create({ data: payload });
  }

  return user;
};

// ---------------------------------------------------------

/**
 * OAuth Login User
 *
 * login function are customized fot the project
 *
 * @param {*} email , password
 * @returns  user , services , accessToken
 */
export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { userCompound: true },
  });

  // Handle errors ( will be catched by error handler)
  if (!user) throw { status: 404, message: "No user found with this email" };

  if (user?.deleted) throw { status: 403, message: "User has been deleted" };

  if (!verifyHash({ password, hashed: user.password })) {
    throw { status: 401, message: "the user credentials are incorrect" };
  }
  if (!user?.active)
    throw { status: 403, message: "Waiting for admin activation or approval." };

  const accessToken = jwt.sign(user, process.env.jwtSecret, {
    expiresIn: process.env.jwtExpires,
  });
  for (let index = 0; index < user.userCompound.length; index++) {
    const compound = await prisma.compound.findUnique({
      where: { id: user.userCompound[index].compoundId },
    });
    user.userCompound[index] = {
      ...user.userCompound[index],
      compoundName: compound.name,
      logoUrl: compound.logoUrl,
    };
  }

  return { user, accessToken };
};

export const getUserCompounds = async (user) => {
  user = await prisma.user.findUnique({
    where: { id: user.id },
    include: { userCompound: true },
  });

  for (let index = 0; index < user.userCompound.length; index++) {
    const compound = await prisma.compound.findUnique({
      where: { id: user.userCompound[index].compoundId },
    });
    user.userCompound[index] = {
      ...user.userCompound[index],
      compoundName: compound.name,
    };
  }
  return user;
};

// ---------------------------------------------------------

// reset password

export const resetPassword = async ({ email, oldPassword, newPassword }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!verifyHash({ password: oldPassword, hashed: user.password }))
    return false;

  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hash({ password: newPassword }),
    },
  });

  return updatedUser;
};

// ---------------------------------------------------------

// Soft delete Account
export const softDelete = (id) =>
  prisma.user.update({
    where: { id: id },
    data: { deleted: true },
  });

// --------------------------------------------------------

export const sendOtp = ({
  email,
  numberOfDigits = 6,
  expiresIn = 30 * 60 * 1000,
}) => {
  const otp = Math.floor(
    Math.pow(10, numberOfDigits - 1) +
      Math.random() * 9 * Math.pow(10, numberOfDigits - 1)
  ).toString();

  const otpExpiresAt = new Date(Date.now() + expiresIn);

  try {
    mailOTP(otp, email).catch(console.error);
  } catch (error) {
    return "emailerror";
  }

  return prisma.user.update({
    where: { email },
    data: { otp: hash({ password: otp }), otpExpiresAt },
  });
};

// ---------------------------------------------------------

async function mailOTP(otp, email) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: "<" + process.env.AUTH_EMAIL + ">",
    to: email,
    subject: "One Time Password",
    text: "Your One Time Password is\t\t" + otp,
    html:
      "<b>Hello</b><p>Your One Time Password is <strong> " +
      otp +
      " </strong></p>", // html body
  });
}

// ---------------------------------------------------------------

export const changePasswordOTP = async (email, password, otp) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return "notFound";
  if (user.deleted) return "deleted";
  const otpExpiresAt = new Date(user.otpExpiresAt);

  if (
    !verifyHash({ password: otp, hashed: user.otp }) ||
    Date.now() >= otpExpiresAt
  ) {
    return "invalidotp";
  }

  return await prisma.user.update({
    where: { email },
    data: { password: hash({ password }) },
  });
};

// ---------------------------------------------------------------

export const isThirdPartyUser = async ({ email, id, phone }) => {
  const user = email
    ? await prisma.user.findUnique({ where: { email } })
    : phone
    ? await prisma.user.findUnique({ where: { phone } })
    : await prisma.user.findUnique({ where: { id: parseInt(id) } });

  if (!user) return "notFound";

  if (user.deleted) return "deleted";
  if (user.googleId) return true;
  if (user.githubId) return true;
  if (!user.password) return true;
  return false;
};
