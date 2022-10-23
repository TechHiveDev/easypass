import React, { useEffect, useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SideDrawer from "../Components/Drawer/Side.drawer";
import TabNavigator from "./Tab.navigator";
import UserCompounds from "../Screens/UserCompounds/UserCompounds";
import AddCompound from "../Screens/AddCompound/AddCompound";
import { useAppDispatch, useAppSelector } from "../Store/redux.hooks";
import { setCurrentCompound } from "../Store/Slices/auth.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingErrorEmpty from "../Components/GenericScreens/LoadingErrorEmpty.screen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { userCompound, currentCompound } = useAppSelector((state) => ({
    userCompound: state?.auth?.user?.userCompound,
    currentCompound: state?.auth?.currentCompound,
  }));
  const [loading, setLoading] = useState(true);
  const userCompoundsLength = userCompound?.length;
  const dispatch = useAppDispatch();
  useEffect(async () => {
    setLoading(true);
    if (userCompoundsLength && userCompoundsLength === 1) {
      dispatch(setCurrentCompound(userCompound[0]));
      return setLoading(false);
    }
    const currentCompoundId = JSON.parse(
      await AsyncStorage.getItem("currentCompound")
    );
    if (currentCompoundId) {
      const currentCompound = userCompound.find(
        (c) => c.id === currentCompoundId
      );
      if (currentCompound) {
        dispatch(setCurrentCompound(currentCompound));
        return setLoading(false);
      }
    }
    return setLoading(false);
  }, [userCompound]);
  if (loading) return <LoadingErrorEmpty isLoading={loading} />;
  return (
    <Drawer.Navigator
      initialRouteName={
        currentCompound ? "HomeStackTabNavigator" : "UserCompounds"
      }
      drawerStyle={{ width: wp(70) }}
      edgeWidth={15}
      screenOptions={{ swipeEnabled: true, headerShown: false }}
      drawerPosition="right"
      drawerContent={(props) => <SideDrawer {...props} />}
    >
      <Drawer.Screen name="UserCompounds" component={UserCompounds} />
      <Drawer.Screen name="CompoundsList" component={AddCompound} />
      <Drawer.Screen name="HomeStackTabNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  );
}
