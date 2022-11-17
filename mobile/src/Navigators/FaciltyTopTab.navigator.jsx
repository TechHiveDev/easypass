import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FacilityStackNavigator from "./SingleFacilityStack.navigator";
import UpcomingFacilitiesScreen from "../Screens/Facility/UpcomingFacilities.screen";
import PastFacilitiesScreen from "../Screens/Facility/PastFacilities.screen";
const Tab = createMaterialTopTabNavigator();

const FacilityTopTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Book" component={FacilityStackNavigator} />
      <Tab.Screen name="UpComing" component={UpcomingFacilitiesScreen} />
      <Tab.Screen name="Past" component={PastFacilitiesScreen} />
    </Tab.Navigator>
  );
};

export default FacilityTopTabNavigator;
