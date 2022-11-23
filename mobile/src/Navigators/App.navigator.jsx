import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UnAuthorizedNavigator from "./UnAuthorized.navigator";
import { useAuthMe } from "../Utils/auth.hook";
import * as SplashScreen from "expo-splash-screen";
import TabNavigator from "./Tab.navigator";
import * as Notifications from "expo-notifications";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function AppNavigator() {
  const { authMe, isAuthenticated, loading } = useAuthMe();

  useEffect(() => {
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
