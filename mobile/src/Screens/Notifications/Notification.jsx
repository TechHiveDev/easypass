import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Button, Card, Text } from "react-native-paper";
import { View } from "react-native";
import theme from "../../Theme/paper.theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Notification = ({ item }) => {
  const cancelled = item.status === "cancelled";
  return (
    <View
      style={{
        marginVertical: hp(2),
      }}
    >
      {Object.keys(item).map((key) => {
        return (
          <Text
            style={{
              fontSize: hp(2),
            }}
            key={key + item.id}
          >
            {key}: {String(item[key])}
          </Text>
        );
      })}
    </View>
  );
};

export default Notification;
