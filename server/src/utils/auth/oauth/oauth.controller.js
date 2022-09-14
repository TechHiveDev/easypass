/**
 *
 *
 */

// -------------------------------------------------------------

import {
  createUserAndAddress,
  login,
  resetPassword,
  sendOtp,
  softDelete,
  changePasswordOTP,
  isThirdPartyUser,
} from "../auth-crud/auth.curd.prisma";

// /oauth/me
export const me = (req, res, next) => res.status(200).json(req.user);

// -------------------------------------------------------------

// /oauth/register
export const registerController = async (req, res, next) => {
  try {
    const user = await createUserAndAddress(req?.body);
    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// -------------------------------------------------------------

// /oauth/login
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req?.body;

    if (!email || !password) {
      throw { status: 400, message: "email and password are required" };
    }

    const user = await login({ email, password });

    return res.status(202).json({ ...user });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------

// /oauth/reset-password
export const resetPasswordController = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword } = req?.body;

    if (!email || !oldPassword || !newPassword) {
      throw {
        status: 400,
        message: "email, oldPassword and newPassword are required",
      };
    }

    const user = await resetPassword({ email, oldPassword, newPassword });
    if (!user) return res.status(401).json({ message: "User not found" });
    return res.status(202).json({ ...user });
  } catch (error) {
    next(error);
  }
};
// -------------------------------------------------------------

// /oauth/delete
export const deleteAccountController = async (req, res, next) => {
  try {
    const id = req?.user.id;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const user = await softDelete(id);
    if (!user) return res.status(401).json({ message: "User not found" });
    return res.status(202).json({ ...user });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------

export const forgotPassword = async (req, res, next) => {
  try {
    const email = req?.body?.email;

    if (!email) return res.status(400).json({ message: "email is required" });

    const isThirdParty = await isThirdPartyUser({ email });
    if (
      isThirdParty === "notFound" ||
      isThirdParty === "deleted" ||
      isThirdParty
    ) {
      return res.status(500).json({ message: "Invalid User" });
    }

    const user = await sendOtp({ email });
    if (user === "emailerror") res.status(500).json({ message: "Email error" });
    return res.status(202).json({ ...user });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------

export const changePasswordOTPController = async (req, res, next) => {
  // TOOD: check if google or github user
  try {
    const { otp, email, newPassword, confirmPassword } = req?.body;

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    if (!otp || !email || !newPassword || !confirmPassword) {
      throw {
        status: 400,
        message: "email, oldPassword , newPassword and OTP are required",
      };
    }

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    const isThirdParty = await isThirdPartyUser({ email });
    if (
      isThirdParty === "notFound" ||
      isThirdParty === "deleted" ||
      isThirdParty
    ) {
      return res.status(500).json({ message: "Invalid User" });
    }

    const user = await changePasswordOTP(email, newPassword, otp);
    if (user === "notFound")
      return res.status(401).json({ message: "Not Found" });

    if (user === "deleted")
      return res.status(401).json({ message: "Deleted User" });

    if (user === "invalidotp")
      return res.status(401).json({ message: "Invalid OTP" });

    return res.status(202).json({ ...user });
  } catch (error) {
    next(error);
  }
};
