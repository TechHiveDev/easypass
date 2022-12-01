import React from "react";
import { I18nManager, View } from "react-native";
import { Provider } from "react-redux";
import { Provider as PaperProvider, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import i18n from "i18n-js";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import store from "./src/Store/app.store";
import AppNavigator from "./src/Navigators/App.navigator";
import theme from "./src/Theme/paper.theme";
import translations from "./src/Config/translations";
import toastConfig from "./src/Config/toast.config";
import { navigationRef } from "./src/Navigators/navigationUtils";

// -----------------------------------------------------

i18n.translations = translations;
i18n.locale = "en";
i18n.fallbacks = true;

// -----------------------------------------------------

const isRTL = i18n.locale === "ar";

// -----------------------------------------------------

const prefix = Linking.createURL("/");

export default function App() {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  const linking = {
    prefixes: [prefix],
  };
  return (
    <>
      {/*<View*/}
      {/*  style={{*/}
      {/*    height: heightPercentageToDP(5),*/}
      {/*  }}*/}
      {/*/>*/}
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<Text>Loading...</Text>}
          >
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
}
