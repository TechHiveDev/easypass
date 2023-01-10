import { getToken } from "firebase/messaging";
import { useEffect } from "react";
import { messaging } from "./firebase";
import customFetch from "../customFetch";

export const useRequestPermissionAndSendToken = () => {
  // @ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const request = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const notificationToken = await getToken(messaging, {
            vapidKey:
              "BA0KkPsqJcZQ_O7wDOuFfoB4Bv9t0vpiYF6mNVGIDzh115WSVK2FJSbeIrhjSqHvAb6zUiT2KGHGKlks9qmDUfA",
          });
          if (notificationToken) {
            await customFetch(`/user/${user.id}`, {
              method: "PUT",
              body: {
                notificationToken,
              },
            });
          }
        }
      } catch (e) {
        console.log("error retrieving token", e);
      }
    };
    if (user?.id) {
      request();
    }
  }, [user?.id]);
};
