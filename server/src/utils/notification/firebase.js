var FCM = require("fcm-node");
var serverKey = process.env.FIREBASE_SERVER_KEY;
var fcm = new FCM(serverKey);
export const sendNotificationFirebase = async ({ usersPushTokens, title, body }) => {
  // console.log({ usersPushTokens, title, body });
  var message = {
    notification: {
      title,
      body,
    },
  };
  usersPushTokens.forEach((userToken) => {
    message.to = userToken;
    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!");
      } else {
        // console.log("Successfully sent with response: ", response);
      }
    });
  });
};
