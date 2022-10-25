import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyStatusBar from "../Components/MyStatusBar";
import FacilityScreen from "../Screens/Facility/Facility.screen";
import SingleFacility from "../Screens/Facility/FacilityCategory.screen";
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
        name="AllFacilityCategories"
        component={FacilityScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="SingleFacilityCategory"
        component={SingleFacility}
        options={screenOptions}
      />
      <Stack.Screen
        name="FacilityItem"
        component={DiscoverItem}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}
