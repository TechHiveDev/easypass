import React from "react";
import { Alert, I18nManager, Platform, View } from "react-native";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import store from "./src/Store/app.store";
import AppNavigator from "./src/Navigators/App.navigator";
import theme from "./src/Theme/paper.theme";
import Toast from "react-native-toast-message";
// import * as Localization from "expo-localization";
import i18n from "i18n-js";
import translations from "./src/Config/translations";
import toastConfig from "./src/Config/toast.config";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useState } from "react";

// -----------------------------------------------------

i18n.translations = translations;
i18n.locale = "en";
i18n.fallbacks = true;
// Localization.locale;

// -----------------------------------------------------

const isRTL = i18n.locale === "ar";

// -----------------------------------------------------

export default function App() {
  const [pushToken, setPushToken] = useState(null);

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
      console.log(token);
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
  useEffect(() => {
    // registerForPushNotificationsAsync();
  }, [registerForPushNotificationsAsync]);
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  return (
    <>
      <View
        style={{
          height: 50,
        }}
      />
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
}
