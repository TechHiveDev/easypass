import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyStatusBar from "../Components/MyStatusBar";
import DiscoverScreen from "../Screens/Discover/Discover.screen";
import SingleDiscovery from "../Screens/Discover/SingleDiscovery.screen";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: true,
  header: (props) => <MyStatusBar {...props} />,
};
export default function ScreensNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllCategories"
        component={DiscoverScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="SingleCategory"
        component={SingleDiscovery}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}
