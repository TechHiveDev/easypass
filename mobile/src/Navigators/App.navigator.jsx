import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import ScreensNavigator from "./Screens.navigator";

// ==============================================================

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ScreensNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
