import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyStatusBar from "../Components/MyStatusBar";
import DrawerNavigator from "./Drawer.navigator";
import ComingSoonScreen from '../Components/GenericScreens/ComingSoon'
// ==============================================================

const Stack = createNativeStackNavigator();

// ==============================================================

const stackrops = {
  initialRouteName: "Tabs",
};

const screenOptions = {
  headerShown: false,
  header: (props) => <MyStatusBar {...props} />,
};

// ==============================================================

export default function ScreensNavigator() {
  return (
    <Stack.Navigator {...stackrops}>
     
      <Stack.Screen
        name="HomeDrawer"
        component={DrawerNavigator}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}
