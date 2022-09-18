import { crud, prismaCrud } from "../../utils/crud/express-crud-router";
import qrcodeService from "./qrcode.service";
// -----------------------------------------------------------

const crudController = {
    // ...prismaCrud("qrcode"),
    // getList: exampleService.getList,
};

// ------------------------------------------------------------------
const customRoutesController = [
    {
        method: "get", // get, post, put, delete  (from express router)
        path: "/guest/:encryptedInvitation",
        controller: async (req, res, next) => {
            // let customRes = exampleService.mario();
            // res.status(202).json({ message: customRes });
        },
    },
    {
        method: "get", // get, post, put, delete  (from express router)
        path: "/guest2/:encryptedInvitation",
        controller: async (req, res, next) => {
            // let customRes = exampleService.mario();
            // res.status(202).json({ message: customRes });
        },
    },
    {
        method: "get", // get, post, put, delete  (from express router)
        path: "/guest3/:encryptedInvitation",
        controller: async (req, res, next) => {
            // let customRes = exampleService.mario();
            // res.status(202).json({ message: customRes });
        },
    },
];

// ------------------------------------------------------------------

export default crud("/qrcode", crudController, customRoutesController);

/**
 * /guest/:encryptedInvitation
 */
const makeEncryptedInvitation = async (req, res, next) => {
    try {
        let res = await QRCodeDecrypt(req.params.encryptedInvitation);
        return res.render("QRCode", { res });
    } catch (error) {
        next(error);
    }
};

// -----------------------------------------------------------

const getEncryptedQrCode = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { compoundId } = req.params;
        let qrcode = await QRCodeEncrypt({ compoundId, userId });
        return res.status(202).json({ qrcode });
    } catch (error) {
        next(error);
    }
};

// -----------------------------------------------------------

const verifyQrCode = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { compoundId } = req.params;
        const { encryptedQrCode } = req.body;
        let qrcode = await QRCodeDecrypt(encryptedQrCode);
        return res.status(202).json({ qrcode });
    } catch (error) {
        next(error);
    }
};

// -----------------------------------------------------------

// export default {
//     makeEncryptedInvitation,
//     getEncryptedQrCode,
//     verifyQrCode,
// };
