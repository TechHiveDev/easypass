import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import ScreensNavigator from "./Screens.navigator";
import UnAuthorizedNavigator from "./UnAuthorized.navigator";
import LoadingErrorEmpty from "../Components/GenericScreens/LoadingErrorEmpty.screen";
import { useAuthMe } from "../Utils/auth.hook";

// ==============================================================

export default function AppNavigator() {
  const { authMe, isAuthenticated, loading } = useAuthMe();

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  useEffect(() => authMe(), []);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (loading) return <LoadingErrorEmpty isLoading={loading} />;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <ScreensNavigator /> : <UnAuthorizedNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
