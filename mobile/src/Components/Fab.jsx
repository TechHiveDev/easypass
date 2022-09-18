import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import theme from "../Theme/paper.theme";
import i18 from "i18n-js";

// =======================================================

export default function Fab({ onPress = null, icon = "plus", label = "" }) {
  return (
    <FAB
      style={styles.fab}
      icon={icon}
      label={label ? i18.t(label) : null}
      onPress={onPress}
    />
  );
}

// =======================================================

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    backgroundColor: theme.colors.accent,
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
