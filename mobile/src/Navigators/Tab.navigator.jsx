import React, { useCallback, useEffect, useState } from "react";
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

// -------------------------------------------------------
export default function TabNavigator() {
  const { userType, id } = useAppSelector((state) => ({
    userType: state?.auth?.user?.type,
    id: state?.auth?.user?.id,
  }));
  const navigation = useNavigation();
  const [pushToken, setPushToken] = useState(null);
  const [notification, setNotification] = useState({});
  const [updateMyProfile] = useUpdateMutation();

  const registerForPushNotificationsAsync = useCallback(async () => {
    Alert.alert("notification triggered");
    if (Device.isDevice) {
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
      const notificationToken = (await Notifications.getExpoPushTokenAsync())
        .data;
      console.log("token is for Backend King Sergi " + notificationToken);
      Alert.alert("token", notificationToken);
      setPushToken(notificationToken);
      const res = await updateMyProfile({
        entity: "user",
        id,
        body: { notificationToken },
      });
      Alert.alert("res", JSON.stringify(res));
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: theme.colors.primary,
      });
    }
  }, [id]);

  const handleNotificationResponse = (response) => {
    console.log(response?.notification?.request?.content?.body);
  };

  useEffect(() => {
    const handleNotification = (n) => {
      setNotification(n);
      const data = n.request.content.data;
      if (data.respond === true) {
        Alert.alert("admin responded", undefined, [
          { text: "Stay here", onPress: () => {} },
          {
            text: "See it",
            onPress: () =>
              navigation.navigate("Services", { screen: "UpComing" }),
            style: "cancel",
          },
        ]);
      }
    };
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
    Notifications.setNotificationHandler(handleNotification);
    return () => {
      Notifications.removeNotificationSubscription(handleNotification);
      Notifications.removeNotificationSubscription(handleNotificationResponse);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
