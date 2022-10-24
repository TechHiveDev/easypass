import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import UnAuthorizedNavigator from "./UnAuthorized.navigator";
import { useAuthMe } from "../Utils/auth.hook";
import DrawerNavigator from "./Drawer.navigator";
import * as SplashScreen from "expo-splash-screen";

// ==============================================================
SplashScreen.preventAutoHideAsync();

export default function AppNavigator() {
  const { authMe, isAuthenticated, loading } = useAuthMe();

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  useEffect(() => {
    authMe().then(() =>
      setTimeout(() => {
        SplashScreen.hideAsync();
        // half a second so that every thing is done
      }, 500)
    );
  }, []);

  if (loading) {
    return null;
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <DrawerNavigator /> : <UnAuthorizedNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
