/**
 * This Module for cryptography
 *
 * Data Encryption : encrypt with public key , decrypt with private key
 *
 * Verify Identities : encrypt with private key , decrypt with public key
 *
 * Digital Siganature : sign the message
 *
 */

// ==================================================================

const crypto = require("crypto");
const fs = require("fs");
const keysPath = __dirname + "/keys";
const { hash } = require("./hashing.js");

// ==================================================================

/* Public and Private keys if exists */
const getPublicKey = () => fs.readFileSync(keysPath + "/id_rsa_public.pem");
const getPrivateKey = () => fs.readFileSync(keysPath + "/id_rsa_private.pem");

// ==================================================================

// Data Encryption
const encryptWithPublicKey = (json) =>
  crypto
    .publicEncrypt(getPublicKey(), JSON.stringify(json))
    .toString("base64url");

const decryptWithPrivateKey = (message) =>
  JSON.parse(
    crypto
      .privateDecrypt(getPrivateKey(), Buffer.from(message, "base64url"))
      .toString()
  );

// ==================================================================

// Verify Identities
const encryptWithPrivateKey = (message) =>
  crypto.privateEncrypt(getPrivateKey(), message);

const decryptWithPublicKey = (message) =>
  crypto.publicDecrypt(getPublicKey(), message).toString();

// ==================================================================

// Digital Signature
const sign = async (message) => {
  const hashedMessage = await hash(message);
  const digitalSignature = encryptWithPrivateKey(hashedMessage);
  return {
    algorithm: "sha256", // should be in env file
    message,
    digitalSignature,
  };
};

// ==================================================================

module.exports = {
  encryptWithPublicKey,
  encryptWithPrivateKey,
  decryptWithPublicKey,
  decryptWithPrivateKey,
  sign,
};
