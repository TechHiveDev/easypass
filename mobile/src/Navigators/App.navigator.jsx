import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import UnAuthorizedNavigator from "./UnAuthorized.navigator";
import { useAuthMe } from "../Utils/auth.hook";
import * as SplashScreen from "expo-splash-screen";
import TabNavigator from "./Tab.navigator";

SplashScreen.preventAutoHideAsync();

export default function AppNavigator() {
  const { authMe, isAuthenticated, loading } = useAuthMe();

  useEffect(() => {
    authMe().then(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <TabNavigator /> : <UnAuthorizedNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
