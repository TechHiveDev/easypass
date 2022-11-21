import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import UnAuthorizedNavigator from "./UnAuthorized.navigator";
import { useAuthMe } from "../Utils/auth.hook";
import * as SplashScreen from "expo-splash-screen";
import TabNavigator from "./Tab.navigator";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import theme from "../Theme/paper.theme";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function AppNavigator() {
  const navigation = useNavigation();
  const [pushToken, setPushToken] = useState(null);
  const [notification, setNotification] = useState({});
  const { authMe, isAuthenticated, loading } = useAuthMe();

  const registerForPushNotificationsAsync = useCallback(async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("token is for Backend King Sergi " + token);
      setPushToken(token);
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: theme.colors.primary,
      });
    }
  }, []);

  const handleNotificationResponse = (response) => {
    console.log(response?.notification?.request?.content?.body);
  };
  useEffect(() => {
    authMe().then(() => {
      SplashScreen.hideAsync();
    });
  }, [authMe]);

  useEffect(() => {
    const handleNotification = (n) => {
      setNotification(n);
      const data = n.request.content.data;
      if (data.respond === true) {
        Alert.alert("admin responded", undefined, [
          { text: "Stay here", onPress: () => {} },
          {
            text: "See it",
            onPress: () =>
              navigation.navigate("Services", { screen: "UpComing" }),
            style: "cancel",
          },
        ]);
      }
    };
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
    Notifications.setNotificationHandler(handleNotification);
  }, [navigation, registerForPushNotificationsAsync]);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {isAuthenticated ? <TabNavigator /> : <UnAuthorizedNavigator />}
    </SafeAreaProvider>
  );
}
