import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Screens/Home/Home.screen";
import MyStatusBar from "../Components/MyStatusBar";
import { capitalize } from "../Utils/string.util";

// Compound Screens
import ListCompoundScreen from "../Screens/Entities/Compound/List.compound.screen";
import ShowCompoundScreen from "../Screens/Entities/Compound/Show.compound.screen";
import CreateCompoundScreen from "../Screens/Entities/Compound/Create.compound.screen";
import EditCompoundScreen from "../Screens/Entities/Compound/Edit.compound.screen";

// User Screens
import ListUserScreen from "../Screens/Entities/User/List.user.screen";
import ShowUserScreen from "../Screens/Entities/User/Show.user.screen";
import CreateUserScreen from "../Screens/Entities/User/Create.user.screen";
import EditUserScreen from "../Screens/Entities/User/Edit.user.screen";

// UserCompound Screens
import ListUserCompoundScreen from "../Screens/Entities/UserCompound/List.userCompound.screen";
import ShowUserCompoundScreen from "../Screens/Entities/UserCompound/Show.userCompound.screen";
import CreateUserCompoundScreen from "../Screens/Entities/UserCompound/Create.userCompound.screen";
import EditUserCompoundScreen from "../Screens/Entities/UserCompound/Edit.userCompound.screen";

// Invitation Screens
import ListInvitationScreen from "../Screens/Entities/Invitation/List.invitation.screen";
import ShowInvitationScreen from "../Screens/Entities/Invitation/Show.invitation.screen";
import CreateInvitationScreen from "../Screens/Entities/Invitation/Create.invitation.screen";
import EditInvitationScreen from "../Screens/Entities/Invitation/Edit.invitation.screen";

// Scan Screens
import ListScanScreen from "../Screens/Entities/Scan/List.scan.screen";
import ShowScanScreen from "../Screens/Entities/Scan/Show.scan.screen";
import CreateScanScreen from "../Screens/Entities/Scan/Create.scan.screen";
import EditScanScreen from "../Screens/Entities/Scan/Edit.scan.screen";

// Device Screens
import ListDeviceScreen from "../Screens/Entities/Device/List.device.screen";
import ShowDeviceScreen from "../Screens/Entities/Device/Show.device.screen";
import CreateDeviceScreen from "../Screens/Entities/Device/Create.device.screen";
import EditDeviceScreen from "../Screens/Entities/Device/Edit.device.screen";

// ==============================================================

const Stack = createNativeStackNavigator();

// ==============================================================

const stackrops = {
  initialRouteName: "Home",
  screenOptions: { headerShown: true, headerStyle: { background: "red" } },
};

const screenOptions = {
  headerTintColor: "red",
  headerTitle: (props) => <MyStatusBar {...props} />,
  headerTintColor: "blue",
};

// ==============================================================

const entitiesScreens = [
  {
    name: "compound",
    screens: [
      { type: "List", component: ListCompoundScreen },
      { type: "Show", component: ShowCompoundScreen },
      { type: "Create", component: CreateCompoundScreen },
      { type: "Edit", component: EditCompoundScreen },
    ],
  },

  {
    name: "user",
    screens: [
      { type: "List", component: ListUserScreen },
      { type: "Show", component: ShowUserScreen },
      { type: "Create", component: CreateUserScreen },
      { type: "Edit", component: EditUserScreen },
    ],
  },

  {
    name: "userCompound",
    screens: [
      { type: "List", component: ListUserCompoundScreen },
      { type: "Show", component: ShowUserCompoundScreen },
      { type: "Create", component: CreateUserCompoundScreen },
      { type: "Edit", component: EditUserCompoundScreen },
    ],
  },

  {
    name: "invitation",
    screens: [
      { type: "List", component: ListInvitationScreen },
      { type: "Show", component: ShowInvitationScreen },
      { type: "Create", component: CreateInvitationScreen },
      { type: "Edit", component: EditInvitationScreen },
    ],
  },

  {
    name: "scan",
    screens: [
      { type: "List", component: ListScanScreen },
      { type: "Show", component: ShowScanScreen },
      { type: "Create", component: CreateScanScreen },
      { type: "Edit", component: EditScanScreen },
    ],
  },

  {
    name: "device",
    screens: [
      { type: "List", component: ListDeviceScreen },
      { type: "Show", component: ShowDeviceScreen },
      { type: "Create", component: CreateDeviceScreen },
      { type: "Edit", component: EditDeviceScreen },
    ],
  },
];

// ==============================================================

export default function ScreensNavigator() {
  return (
    <Stack.Navigator {...stackrops}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          ...screenOptions,
          title: "Home",
        }}
      />
      {entitiesScreens?.map(({ name, screens }) =>
        screens?.map(({ type, component }) => (
          <Stack.Screen
            name={type + capitalize(name) + "Screen"}
            initialParams={{ entity: name }}
            component={component}
            options={{
              ...screenOptions,
              title: type + " " + capitalize(name),
            }}
          />
        ))
      )}
    </Stack.Navigator>
  );
}
