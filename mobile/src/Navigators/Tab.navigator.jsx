import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "../Store/redux.hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../Theme/paper.theme";
import MyStatusBar from "../Components/MyStatusBar";

// -------------------------------------------------------

import HomeScreen from "../Screens/Home/Home.screen";
import Facilities from "./FacilityStack.navigator";
import Profile from "../Screens/Profile/Profile.screen";
import QrCode from "../Screens/QrCode/QrCode.screen";
import InviteGuesst from "../Screens/InviteGuest/InviteGuest.screen";
import ScanQrCode from "../Screens/ScanQrCode/ScanQrCode.screen";
import Discover from "./DiscoverStack.navigator";
// -------------------------------------------------------

const Tab = createBottomTabNavigator();

// -------------------------------------------------------

const screenOptions = ({ route: { name } }) => ({
  headerShown: true,
  swipeEnabled: true,
  header: (props) => <MyStatusBar {...props} />,
  tabBarIcon: ({ color }) => {
    let iconName = "book";

    if (name === "Home") {
      iconName = "home";
    } else if (name === "Invite") {
      iconName = "message-arrow-right-outline";
    } else if (name === "Qrcode") {
      iconName = "qrcode-scan";
    } else if (name === "QR Code") {
      iconName = "qrcode-scan";
    } else if (name === "Scan") {
      iconName = "qrcode-scan";
    } else if (name === "Profile") {
      iconName = "account";
    } else if (name === "Facilities") {
      iconName = "tools";
    } else if (name === "Discover") {
      iconName = "map-marker";
    }
    return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
  },
  tabBarActiveTintColor: theme.colors.primary,
  tabBarInactiveTintColor: "gray",
  tabBarStyle: { height: hp(9) },
  tabBarItemStyle:
    name === "QR Code"
      ? { display: "none" }
      : { paddingTop: hp(0.5), paddingBottom: hp(1.5) },
  tabBarHideOnKeyboard: true,
});

// -------------------------------------------------------

export default function TabNavigator() {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const userType = useAppSelector((state) => state?.auth?.user?.type);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return userType === "Security" ? (
    <Tab.Navigator screenOptions={screenOptions}>
      {/*<Tab.Screen name={"home"} component={HomeScreen} />*/}
      <Tab.Screen name={"Profile"} component={Profile} />
      <Tab.Screen name={"Scan"} component={ScanQrCode} />
    </Tab.Navigator>
  ) : (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={"Home"} component={HomeScreen} />
      <Tab.Screen name={"Invite"} component={InviteGuesst} />
      <Tab.Screen
        name={"Discover"}
        component={Discover}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name={"QR Code"} component={QrCode} />
      <Tab.Screen name={"Facilities"} component={Facilities} options={{
          headerShown: false,
      }} />
      <Tab.Screen name={"Profile"} component={Profile} />
    </Tab.Navigator>
  );
}
