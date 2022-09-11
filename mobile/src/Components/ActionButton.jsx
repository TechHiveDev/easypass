import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../Theme/colors.theme";
import { Feather } from "@expo/vector-icons";

// =======================================================

export default function ActionButton({
  onPress,
  Icon = null,
  name = "plus",
  size = 22,
}) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      {Icon ? (
        <Icon />
      ) : (
        <Feather {...{ name, size }} color={colors.background} />
      )}
    </TouchableOpacity>
  );
}

// =======================================================

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderRadius: 300,
    zIndex: 2,
    top: hp("80%"),
    left: wp("78%"),
  },
});
