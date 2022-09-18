import { StyleSheet } from "react-native";
import { colors } from "./colors.theme";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { pow } from "react-native-reanimated";

// ----------------------------------------

const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: colors.background,
    width: wp(100),
    paddingHorizontal: wp(2),
  },
  rowView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

// ----------------------------------------

export default globalStyles;
