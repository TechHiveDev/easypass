import React from "react";
import { View, StyleSheet } from "react-native";
import MyText from "./MyText";
import { colors } from "../Theme/colors.theme";

// =====================================================

export default function ErrorScreen({ error = "" }) {
  console.error({ error });
  return (
    <View style={styles.container}>
      <MyText style={styles.text} text={JSON.stringify(error, null, 4)} />
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
