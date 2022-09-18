/**
 * This moudle for global styles will be used in many components
 */
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";

// =================================================================

export const colors = {
  mainColor: "#2AA6DE",
  mainColor2: "#F6881F",
  mainColor3: "#077db3",
  opaqueBackground: "#2aa6de33",
  placholderColor: "#696969",
  placholderColor2: "#D6D6D6",
  white: "#FFFFFF",
  orange: "#ff8c00",
  black: "black",
};

// =================================================================

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("5%"),
    backgroundColor: colors.white,
    paddingHorizontal: wp("5%"),
  },
  Btn: {
    color: colors.white,
    fontSize: RFValue(30, 1024),
    paddingLeft: wp("28%"),
    paddingRight: wp("15%"),
    fontWeight: "bold",
  },
  hostScreenSection: {
    marginVertical: hp("1%"),
    paddingVertical: wp("0.5%"),
    paddingHorizontal: wp("1%"),
  },
  loadMoreText: {
    alignSelf: "center",
    textAlign: "center",
    width: wp("30%"),
    paddingVertical: hp("1%"),
    color: colors.white,
    fontWeight: "bold",
    fontSize: 12,
    marginVertical: hp("1%"),
    backgroundColor: colors.mainColor,
    borderRadius: 7,
  },
});
