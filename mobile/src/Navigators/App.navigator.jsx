import React, { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UnAuthorizedNavigator from "./UnAuthorized.navigator";
import { useAuthMe } from "../Utils/auth.hook";
import * as SplashScreen from "expo-splash-screen";
import TabNavigator from "./Tab.navigator";
import * as Notifications from "expo-notifications";
import { useAppSelector } from "../Store/redux.hooks";
import { useUpdateMutation } from "../API/api";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import { Alert, Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../Utils/firebase";
import { navigate } from "./navigationUtils";

const appConfig = require("../../app.json");
const projectId = appConfig?.expo?.extra?.eas?.projectId;

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const pendingNotifications = [];
let notificationsHandler;

export default function AppNavigator() {
  const { authMe, isAuthenticated, loading } = useAuthMe();

  const id = useAppSelector((state) => state?.auth?.user?.id);
  const [updateMyProfile] = useUpdateMutation();
  const navigation = useNavigation();
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    const data = notification?.notification?.request?.content?.data;
    navigate("Services", {
      screen: "UpComing",
      params: {
        id: data?.requestId,
      },
    });
  }, [notification?.notification?.request?.content?.data]);
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Device.isDevice && id) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          Alert.alert("Allow access to notification from the settings!");
          return;
        }
        const notificationToken = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        updateMyProfile({
          entity: "user",
          id,
          body: { notificationToken },
        });
        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "rgba(0,255,239,0.49)",
          });
        }
        return notificationToken;
      } else {
        if (id) {
          Alert.alert("Must use physical device for Push Notifications");
          return null;
        }
      }
    };
    registerForPushNotificationsAsync();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notif) => {
        const data = notif?.request?.content?.data;
        if (data?.respond === true) {
          Alert.alert("admin responded to your request", undefined, [
            {
              text: "Stay here",
              onPress: () => {},
            },
            {
              text: "See it",
              onPress: () => {
                if (id) {
                  navigation.navigate("Services", {
                    screen: "UpComing",
                    params: {
                      id: data?.requestId,
                    },
                  });
                } else {
                  Alert.alert("Authentication", "You must login first");
                }
              },
              style: "cancel",
            },
          ]);
        }
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((r) => {
        if (notificationsHandler !== undefined) {
          notificationsHandler(r);
        } else {
          pendingNotifications.push(r);
        }
      });
    notificationsHandler = setNotification;
    while (pendingNotifications.length > 0) {
      const pendingNotification = pendingNotifications.pop();
      notificationsHandler(pendingNotification);
    }
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [id]);

  useEffect(() => {
    initializeApp(firebaseConfig);
    authMe().then(() => {
      SplashScreen.hideAsync();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return null;
  }
  return (
    <SafeAreaProvider>
      {isAuthenticated ? <TabNavigator /> : <UnAuthorizedNavigator />}
    </SafeAreaProvider>
  );
}
