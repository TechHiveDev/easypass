import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyStatusBar from "../Components/MyStatusBar";
import FacilityScreen from "../Screens/Facility/Facility.screen";
import SingleFacility from "../Screens/Facility/FacilityCategory.screen";
import FacilityItem from "../Screens/Facility/FacilityItem.screen";
import FacilityNotifications from "../Screens/Facility/FacilityNotifications";
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
        component={FacilityItem}
        options={screenOptions}
      />
      <Stack.Screen
        name="FacilityNotifications"
        component={FacilityNotifications}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}
