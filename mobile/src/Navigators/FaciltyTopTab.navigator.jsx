import React from "react";
import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FacilityStackNavigator from "./SingleFacilityStack.navigator";
const Tab = createMaterialTopTabNavigator();

const UpComing = () => (
  <View>
    <Text>UpComing</Text>
  </View>
);

const Past = () => (
  <View>
    <Text>Past</Text>
  </View>
);

const FacilityTopTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={"Book"} component={FacilityStackNavigator} />
      <Tab.Screen name="UpComing" component={UpComing} />
      <Tab.Screen name="Past" component={Past} />
    </Tab.Navigator>
  );
};

export default FacilityTopTabNavigator;
