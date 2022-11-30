import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyStatusBar from "../Components/MyStatusBar";
import HomeScreen from "../Screens/Home/Home.screen";
import { SafeAreaView, ScrollView, Text } from "react-native";
import globalStyles from "../Theme/global.styles";
import theme from "../Theme/paper.theme";
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  header: (props) => <MyStatusBar {...props} />,
};
const Notifications = () => {
  return (
    <SafeAreaView
      style={[
        globalStyles.screen,
        {
          backgroundColor: theme.colors.transparentGrey,
        },
      ]}
    >
      <ScrollView>
        <Text>Notifications</Text>
      </ScrollView>
    </SafeAreaView>
  );
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
