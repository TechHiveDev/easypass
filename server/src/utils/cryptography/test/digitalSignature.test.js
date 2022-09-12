const { hash } = require("../hashing.js");
const {
    sign,
    decryptWithPublicKey,
} = require("../cryptography.js");

console.log(
    "Simualting verify identities by digital signature between bob and alice"
);

const message = " mario i love you so much";

(async () => {
    const signedMessage = await sign(message);
    console.log("Bob Send to alice message : ", message);
    console.log("Bob signed his message : ", signedMessage);
    console.log("=========================================");
    console.log("Alive Recived it ");
    const decryptedSignature = decryptWithPublicKey(
        signedMessage.digitalSignature
    );
    console.log(
        "Alice will decrypt the signature by Bob's Public key",
        decryptedSignature
    );

    const hashedMessage = await hash(signedMessage.message);

    console.log("Alice hash the plain message:  ", hashedMessage);

    console.log("is hashed message equal to the decrypted signature  ?");
    console.log(
        decryptedSignature === hashedMessage
            ? "the are equivanet ( Validated Signature ! )"
            : " not equivalent "
    );
})();
