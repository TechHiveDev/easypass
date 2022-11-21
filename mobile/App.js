import React from "react";
import { I18nManager, View } from "react-native";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import store from "./src/Store/app.store";
import AppNavigator from "./src/Navigators/App.navigator";
import theme from "./src/Theme/paper.theme";
import Toast from "react-native-toast-message";
import i18n from "i18n-js";
import translations from "./src/Config/translations";
import toastConfig from "./src/Config/toast.config";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { NavigationContainer } from "@react-navigation/native";

// -----------------------------------------------------

i18n.translations = translations;
i18n.locale = "en";
i18n.fallbacks = true;

// -----------------------------------------------------

const isRTL = i18n.locale === "ar";

// -----------------------------------------------------

export default function App() {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  return (
    <>
      {/*<View*/}
      {/*  style={{*/}
      {/*    height: heightPercentageToDP(5),*/}
      {/*  }}*/}
      {/*/>*/}
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
}
