const {
    encryptWithPublicKey,
    encryptWithPrivateKey,
    decryptWithPublicKey,
    decryptWithPrivateKey,
    sign,
} = require("../cryptography.js");

const {
    hash,
    verifyHash,
    bcryptHash,
    bcryptVerifyHash,
} = require("../hashing.js");


const cipher1 = encryptWithPublicKey("mario  1 ");
const plain1 = decryptWithPrivateKey(cipher1);

console.log(cipher1);
console.log(plain1);

const cipher2 = encryptWithPrivateKey("mario  2 ");
const plain2 = decryptWithPublicKey(cipher2);

console.log(cipher2);
console.log(plain2);

(async function run() {
    const password1 = "123456";
    const password2 = "mario";

    let password1_hash = await hash(password1);
    let password2_hash = await hash(password2);

    console.log("hashed password 1 crypto ", password1_hash);
    console.log("hashed password 2 crypto ", password2_hash);

    let password1_verify = await verifyHash(password1, password1_hash);
    let password2_verify = await verifyHash(password2, password2_hash);
    console.log("verify password 1 hash", password1_verify);
    console.log("verify password 2 hash", password2_verify);

    password1_hash = await bcryptHash(password1);
    password2_hash = await bcryptHash(password2);

    console.log("hashed password 1 bcrypt ", password1_hash);
    console.log("hashed password 2 bcrypt ", password2_hash);

    password1_verify = await bcryptVerifyHash(password1, password1_hash);
    password2_verify = await bcryptVerifyHash(password2, password2_hash);

    console.log("verify password 1 hash", password1_verify);
    console.log("verify password 2 hash", password2_verify);

    const message = " mario i love you so much";
    const obj = await sign(message);
    const signature = obj.digitalSignature;
    const decryptedSign = decryptWithPublicKey(signature).toString();
    const hashedMessage = await hash(obj.message);
    console.log(hashedMessage);
    console.log(decryptedSign);
    console.log("verify signature : ", hashedMessage === decryptedSign);
})();
