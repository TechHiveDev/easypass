import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyStatusBar from "../Components/MyStatusBar";
import SideDrawer from "../Components/Drawer/Side.drawer";
import TabNavigator from "./Tab.navigator";

// ==============================================================

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// ==============================================================

const stackrops = {
  initialRouteName: "Tabs",
};

const screenOptions = {
  headerShown: true,
  header: (props) => <MyStatusBar {...props} />,
};

// ==============================================================

const StackTabNavigator = () => {
  return (
    <Stack.Navigator {...stackrops}>
      <Stack.Screen
        name="HomeTabNavigator"
        component={TabNavigator}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

// ==============================================================

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawerNavigator"
      drawerStyle={{ width: wp(70) }}
      edgeWidth={15}
      screenOptions={{ swipeEnabled: true, headerShown: false }}
      drawerPosition="right"
      drawerContent={(props) => <SideDrawer {...props} />}
    >
      <Drawer.Screen
        name="HomeStackTabNavigator"
        component={StackTabNavigator}
      />
    </Drawer.Navigator>
  );
}