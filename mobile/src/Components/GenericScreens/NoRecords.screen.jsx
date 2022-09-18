import React from "react";
import { View, StyleSheet } from "react-native";
import MyText from "../MyText";
import theme from "../../Theme/paper.theme";
import i18n from "i18n-js";

// =====================================================

export default function NoRecords({ text = "records" }) {
  return (
    <View style={styles.container}>
      <MyText text={`${i18n.t("no")} ${i18n.t(text)}`} style={styles.text} />
    </View>
  );
}

// =====================================================

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: theme.colors.primary, fontSize: 22, fontWeight: "300" },
});
