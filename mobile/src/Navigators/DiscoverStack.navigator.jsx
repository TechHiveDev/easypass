import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyStatusBar from "../Components/MyStatusBar";
import DiscoverScreen from "../Screens/Discover/Discover.screen";
import SingleDiscovery from "../Screens/Discover/DiscoveryCategory.screen";
import DiscoverItem from "../Screens/Discover/DiscoverItem.screen";
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: true,
  header: (props) => <MyStatusBar {...props} />,
};
export default function ScreensNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllDiscoverCategories"
        component={DiscoverScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="SingleDiscoverCategory"
        component={SingleDiscovery}
        options={screenOptions}
      />
      <Stack.Screen
        name="DiscoverItem"
        component={DiscoverItem}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}
