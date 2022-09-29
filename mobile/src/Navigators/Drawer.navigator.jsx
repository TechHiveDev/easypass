import React, { useEffect } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyStatusBar from "../Components/MyStatusBar";
import SideDrawer from "../Components/Drawer/Side.drawer";
import TabNavigator from "./Tab.navigator";
import UserCompounds from "../Screens/UserCompounds/UserCompounds";
import AddCompound from "../Screens/AddCompound/AddCompound";
import { useAppDispatch, useAppSelector } from "../Store/redux.hooks";
import { setCurrentCompound } from "../Store/Slices/auth.slice";

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
  const userCompound = useAppSelector(
    (state) => state?.auth?.user?.userCompound
  );
  const userCompoundsLength = userCompound?.length;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userCompoundsLength && userCompoundsLength === 1) {
      dispatch(setCurrentCompound(userCompound[0]));
    }
  }, [userCompound]);
  return (
    <Drawer.Navigator
      initialRouteName={
        userCompoundsLength === 1 ? "HomeStackTabNavigator" : "UserCompounds"
      }
      drawerStyle={{ width: wp(70) }}
      edgeWidth={15}
      screenOptions={{ swipeEnabled: true, headerShown: false }}
      drawerPosition="right"
      drawerContent={(props) => <SideDrawer {...props} />}
    >
      <Drawer.Screen name="UserCompounds" component={UserCompounds} />
      <Drawer.Screen name="CompoundsList" component={AddCompound} />
      <Drawer.Screen
        name="HomeStackTabNavigator"
        component={StackTabNavigator}
      />
    </Drawer.Navigator>
  );
}
