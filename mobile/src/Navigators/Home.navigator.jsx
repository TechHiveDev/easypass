import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyStatusBar from "../Components/MyStatusBar";
import HomeScreen from "../Screens/Home/Home.screen";
import Notifications from "../Screens/Notifications";
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  header: (props) => <MyStatusBar {...props} />,
};

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="NotificationsScreen"
        component={Notifications}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
