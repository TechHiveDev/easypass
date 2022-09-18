import React from "react";
import { View, StyleSheet } from "react-native";
import MyText from "../MyText";
import { colors } from "../../Theme/colors.theme";

// =====================================================

export default function ComingSoonScreen() {
  return (
    <View style={styles.container}>
      <MyText style={styles.text} text={"Commig Soon"} />
    </View>
  );
}

// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  text: {
    color: "red",
    fontWeight: "bold",
    fontSize: 14,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 7,
    borderColor: "red",
  },
});
