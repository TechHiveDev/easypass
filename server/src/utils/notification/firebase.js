import { admin } from "firebase-admin";
import fcm from "fcm-notification";

// import serviceAccount from "../configs/push-notification-key.json";
import { serviceAccount } from "../configs/configs";

const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

export const sendNotification = ({ usersPushTokens, title, body }) => {
  try {
    let message = {
      notification: {
        title,
        body,
      },
      token: usersPushTokens,
    };
    FCM.send(message, function (err, res) {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    throw err;
  }
  return true;
};
