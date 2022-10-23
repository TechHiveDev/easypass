import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import UnAuthorizedNavigator from "./UnAuthorized.navigator";
import LoadingErrorEmpty from "../Components/GenericScreens/LoadingErrorEmpty.screen";
import { useAuthMe } from "../Utils/auth.hook";
import DrawerNavigator from "./Drawer.navigator";

// ==============================================================

export default function AppNavigator() {
  const { authMe, isAuthenticated, loading } = useAuthMe();

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  useEffect(() => {
    authMe();
  }, []);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (loading) return <LoadingErrorEmpty isLoading={loading} />;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <DrawerNavigator /> : <UnAuthorizedNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
