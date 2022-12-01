import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Button, Card, Text } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";
import theme from "../../Theme/paper.theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
//   Pending // pendingAt  (by user)
// Cancelled // cancelledAt (by user)
// AdminRefused // adminRefusedAt (by admin)
// InProgress // inProgressAt (by user/by admin)
// Completed // completedAt (by user/by admin)
const messageMapper = {
  // Pending: "You requested",
  // Cancelled: "You cancelled",
  // AdminRefused: "Admin refused your service request",
  // InProgress: "Service is in progress",
  Completed: "Your Service has been completed",
};
const timeMerger = (from, to) => {
  return ` at ${from.split("T")[0]} from ${from
    .split("T")[1]
    .substring(0, 5)} to ${to.split("T")[1].substring(0, 5)} `;
};
const getMessage = ({ name, from, to, status }) => {
  if (status === "Cancelled") {
    return "You cancelled " + name + "service" + timeMerger(from, to);
  }
  if (status === "AdminRefused") {
    return "Admin refused your " + name + "request" + timeMerger(from, to);
  }
  if (status === "InProgress") {
    return (
      "the " +
      name +
      " service you requested" +
      timeMerger(from, to) +
      "is in progress"
    );
  }
  if (status === "Completed") {
    return (
      "the " +
      name +
      " service you requested" +
      timeMerger(from, to) +
      " is completed"
    );
  }
  return "You requested " + name + " service" + timeMerger(from, to);
};
const Notification = ({ item }) => {
  const { status, seen, icon, name, requestId, from, to } = item;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Services", {
          screen: "UpComing",
          params: {
            id: requestId,
          },
        })
      }
    >
      <Card
        style={{
          marginBottom: hp(1.5),
        }}
      >
        <Card.Content
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary,
              padding: wp(1),
              width: wp(10),
              height: wp(10),
              borderRadius: wp(10 / 2),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name={icon}
              color={theme.colors.white}
              size={wp(6)}
            />
          </View>
          <Text
            style={{
              width: wp(80),
              marginLeft: wp(4),
            }}
          >
            {getMessage({ name: name.toLowerCase(), from, to, status })}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default Notification;
