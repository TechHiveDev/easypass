import { PrismaClient } from "@prisma/client";
import {
  decryptWithPrivateKey,
  encryptWithPublicKey,
} from "../../../utils/cryptography/cryptography";

// ===============================================================

const prisma = new PrismaClient({
  log: ["info"],
});

// ===============================================================

/**
 * Verify Scan QrCode for Resident
 */
export const verifyResidentQrCode = async ({ userId, compoundId, type }) => {};

// ===============================================================

/**
 * Verify Scan QrCode for Guest ( delivery or guest )
 */
export const verifyGuestQrCode = async ({ userId, compoundId, type }) => {};

// ===============================================================

export default {
  create,
  scanQrCode,
  generateResidentQrCode,
};
