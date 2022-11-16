import { StyleSheet } from "react-native";
import { colors } from "./colors.theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import theme from "./paper.theme";

// ----------------------------------------

const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: theme.colors.transparentGrey,
    width: wp(100),
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
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
