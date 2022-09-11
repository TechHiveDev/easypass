import MyText from "./MyText.jsx";
import { View, StyleSheet } from "react-native";

// ========================================================

export default function MyStatusBar({ children }) {
  return (
    <View style={styles.container}>
      <MyText text={children} />
    </View>
  );
}

// ========================================================

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: -1,
    // backgroundColor: "white",
    // height: 60,
    // marginLeft: -20,
    // marginBottom: -1,
  },
});
