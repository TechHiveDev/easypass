import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import theme from "../../Theme/paper.theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUpdateMutation } from "../../API/api";
import TouchableOpacity from "../../Components/TouchableOpacity";

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
  const { status, seen, icon, name, requestId, from, to, respondNote, past } =
    item;
  const navigation = useNavigation();
  const [markAsSeen] = useUpdateMutation({
    entity: "request",
    id: requestId,
    body: {
      seen: true,
    },
  });
  return (
    <TouchableOpacity
      onPress={async () => {
        markAsSeen({
          entity: "request",
          id: requestId,
          body: {
            seen: true,
          },
        });
        navigation.navigate("Services", {
          screen: past ? "Past" : "UpComing",
          params: {
            id: requestId,
          },
        });
      }}
    >
      <Card
        style={
          seen
            ? styles.card
            : {
                ...styles.card,
                borderColor: theme.colors.primary,
                borderWidth: wp(1),
              }
        }
      >
        <Card.Content style={styles.row}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={icon}
              color={theme.colors.white}
              size={wp(6)}
            />
          </View>
          <View style={styles.col}>
            <Text>
              {getMessage({
                name: name.toLowerCase(),
                from,
                to,
                status,
              })}
              {respondNote ? " with message from admin" : ""}
            </Text>
            {respondNote ? (
              <Text style={styles.message}>{respondNote} </Text>
            ) : null}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default Notification;
const styles = StyleSheet.create({
  card: {
    marginBottom: hp(2),
  },
  iconContainer: {
    backgroundColor: theme.colors.primary,
    padding: wp(1),
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10 / 2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    width: wp(75),
    marginLeft: wp(4),
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  message: {
    fontWeight: "bold",
  },
});
