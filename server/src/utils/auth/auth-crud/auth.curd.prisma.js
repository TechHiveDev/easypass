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
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info" /* "query" */] });

import nodemailer from "nodemailer";
// ---------------------------------------------------------

export const createUserAndAddress = async (data) => {
  if (data.type === "Resident") {
    const address = {
      compoundId: data.compoundId,
      streetName: data.streetName,
      blockNumber: data.blockNumber,
      unitNumber: data.unitNumber,
    };

    // to create user successfully
    delete data.compoundId;
    delete data.streetName;
    delete data.blockNumber;
    delete data.unitNumber;

    // ----------------------------

    return prisma.user.create({
      data: {
        ...data,
        password: hash({ password: data.password }),
        userCompound: {
          create: [address],
        },
      },
    });
  } else {
    return prisma.user.create({
      data: {
        ...data,
        password: hash({ password: data.password }),
      },
    });
  }
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
export const login = async ({ email, phone, id, password }) => {
  const user = email
    ? await prisma.user.findUnique({ where: { email } })
    : phone
    ? await prisma.user.findUnique({ where: { phone } })
    : await prisma.user.findUnique({ where: { id: parseInt(id) } });

  if (!user) return "notFound";

  if (user.deleted) return "deleted";

  if (!verifyHash({ password, hashed: user.password })) {
    return "invalidPassword";
  }

  // forever access token ( just bad shit beacuase of screens )
  const accessToken = jwt.sign(user, process.env.jwtSecret, {
    expiresIn: "9999 years",
  });

  return { user, accessToken };
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
  // console.log("Message sent: %s", info.messageId);
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
