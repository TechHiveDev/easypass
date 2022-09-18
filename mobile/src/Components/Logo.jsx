import { Image, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// ----------------------------------------------------------------

export default function Logo({
  containerWidth = 95,
  width = 100,
  height = 80,
  source = require("../../assets/logo.png"),
}) {
  return (
    <View style={{ ...styles.container, width: wp(containerWidth) }}>
      <Image style={{ width, height }} source={source} />
    </View>
  );
}

// ----------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
