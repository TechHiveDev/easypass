import crypto from "crypto";
import bcrypt from "bcrypt";

/* Hashing with random salt */

// ============================================================

/**
 * Hash str by crypto ( built-in )
 * @param {*} str
 * @returns
 */
const hash = async (str) => {
  return new Promise((resolve, reject) => {
    try {
      const algorithm = "sha256"; // should be at env
      const hash = crypto.createHash(algorithm).update(str).digest("hex");
      resolve(hash);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

// -----------------------------------------------

/**
 * Verify Hash by crypto ( built-in )
 * @param {*} str
 * @returns
 */
const verifyHash = async (str, hashedStr) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newHashed = await hash(str);
      resolve(newHashed === hashedStr);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

// ============================================================

/**
 * bcrypt Hash string by bcrypt
 * @param {*} str
 * @returns
 */
const bcryptHash = async (str) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(str, salt);
  return hash;
};

// -----------------------------------------------

/**
 * bcrypt Verify Hash
 * @param {*} str
 * @param {*} hash
 * @returns Promise returns true or false
 */
const bcryptVerifyHash = async (str, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(str, hash, (err, same) => {
      if (err) {
        return reject(err);
      }
      return resolve(same);
    });
  });
};

// ============================================================

module.exports = {
  hash,
  verifyHash,
  bcryptHash,
  bcryptVerifyHash,
};
