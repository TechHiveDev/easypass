import { View, Text, StyleSheet } from "react-native";
import { colors } from "../Theme/colors.theme";

// ===============================================

export default function MyText({ text, size = "medium", style = {} }) {
  return (
    <View>
      <Text style={{ ...styles.text, ...style }}>{text}</Text>
    </View>
  );
}

// ===============================================

const styles = StyleSheet.create({
  text: { color: colors.text },
});
