import React, { useEffect, useRef, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "../Store/redux.hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../Theme/paper.theme";
import MyStatusBar from "../Components/MyStatusBar";
import HomeScreen from "../Screens/Home/Home.screen";
import FacilitiesNavigator from "./FaciltyTopTab.navigator";
import Profile from "../Screens/Profile/Profile.screen";
import QrCode from "../Screens/QrCode/QrCode.screen";
import InviteGuest from "../Screens/InviteGuest/InviteGuest.screen";
import ScanQrCode from "../Screens/ScanQrCode/ScanQrCode.screen";
import Discover from "./DiscoverStack.navigator";
import { useNavigation } from "@react-navigation/native";
import { useUpdateMutation } from "../API/api";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import { initializeApp } from "firebase/app";

const appConfig = require("../../app.json");
const projectId = appConfig?.expo?.extra?.eas?.projectId;
// -------------------------------------------------------
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
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
    } else if (name === "Services") {
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

const firebaseConfig = {
  apiKey: "AIzaSyCM-MKKdGwC3XAtM-gCYsg_bJiVLwoqxeo",
  authDomain: "easypass-test.firebaseapp.com",
  projectId: "easypass-test",
  storageBucket: "easypass-test.appspot.com",
  messagingSenderId: "176720501942",
  appId: "1:176720501942:web:8521372009ba8de5d15a17",
  measurementId: "G-GPV3EWF9SD",
};
export default function TabNavigator() {
  const { userType, id } = useAppSelector((state) => ({
    userType: state?.auth?.user?.type,
    id: state?.auth?.user?.id,
  }));
  const [updateMyProfile] = useUpdateMutation();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(true);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Device.isDevice) {
        Alert.alert("is device true");
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          Alert.alert("Failed to get push token for push notification!");
          return;
        }
        const notificationToken = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log("token is for Backend King Sergi " + notificationToken);
        Alert.alert("token", notificationToken);
        const res = await updateMyProfile({
          entity: "user",
          id,
          body: { notificationToken },
        });
        Alert.alert("res", JSON.stringify(res));
        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "rgba(0,255,239,0.49)",
          });
        }
        return notificationToken;
      } else {
        Alert.alert("Must use physical device for Push Notifications");
        return null;
      }
    };
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
  }, []);
  return userType === "Security" ? (
    <Tab.Navigator screenOptions={screenOptions}>
      {/*<Tab.Screen name={"home"} component={HomeScreen} />*/}
      <Tab.Screen name={"Profile"} component={Profile} />
      <Tab.Screen name={"Scan"} component={ScanQrCode} />
    </Tab.Navigator>
  ) : (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={"Home"} component={HomeScreen} />
      <Tab.Screen name={"Invite"} component={InviteGuest} />
      <Tab.Screen
        name={"Discover"}
        component={Discover}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name={"QR Code"} component={QrCode} />
      <Tab.Screen
        name={"Services"}
        component={FacilitiesNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name={"Profile"} component={Profile} />
    </Tab.Navigator>
  );
}
