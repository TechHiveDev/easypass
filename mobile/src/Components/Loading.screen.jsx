import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../Theme/colors.theme";

// =====================================================

export default function LoadingScreen({ size = "large" }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
}

// =====================================================

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
});
