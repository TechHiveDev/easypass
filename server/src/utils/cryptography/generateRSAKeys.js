/**
 * Generate RSA Keys (Public Key , Private Key)
 * This module for Generate Private and Public Key for cryptography purposes
 */

// ==================================================================

const crypto = require("crypto");
const fs = require("fs");
const { promisify } = require("util");
const keysPath = __dirname + "/keys";

// ==================================================================

/* Generate new public and private key */
const generateKeyPair = promisify(crypto.generateKeyPair);
const generateRSAKeys = async () => {
  try {
    const { publicKey, privateKey } = await generateKeyPair("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: { type: "pkcs1", format: "pem" },
      privateKeyEncoding: { type: "pkcs1", format: "pem" },
    });
    await fs.promises.writeFile(keysPath + "/id_rsa_public.pem", publicKey);
    await fs.promises.writeFile(keysPath + "/id_rsa_private.pem", privateKey);
  } catch (err) {
    console.error(err);
  }
};

// ==================================================================

module.exports = generateRSAKeys;
