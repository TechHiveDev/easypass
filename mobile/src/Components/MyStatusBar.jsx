import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import theme from "../Theme/paper.theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const hiddenStatusBar = ["login", "Home", "AllFacilityCategories"];
const allowBackList = [
  "SingleDiscoveryCategory",
  "DiscoverItem",
  "FacilityItem",
];
// ========================================================
const mapper = {
  AllDiscoverCategories: "Discover",
  AllFacilityCategories: "Facilities",
};
export default function MyStatusBar({
  navigation: { goBack },
  route: { name, params },
}) {
  const title = params?.title
    ? params.title
    : mapper[name]
    ? mapper[name]
    : name;
  const allowBack = params?.allowBack || allowBackList.includes(name);
  if (hiddenStatusBar.includes(name)) return <></>;
  if (allowBack) {
    return (
      <Appbar.Header style={styles.header} statusBarHeight={0}>
        <Appbar.BackAction onPress={goBack} color={theme.colors.primary} />
        <Appbar.Content title={title} titleStyle={styles.content} />
        <Appbar.BackAction
          disabled={true}
          onPress={goBack}
          color={theme.colors.primary}
          style={{
            opacity: 0,
          }}
        />
      </Appbar.Header>
    );
  }
  return (
    <Appbar.Header style={styles.header} statusBarHeight={0}>
      <Appbar.Content title={title} titleStyle={styles.content} />
    </Appbar.Header>
  );
}

// ========================================================

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.transparentGrey,
    width: wp(94.5),
    marginHorizontal: wp(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: theme.colors.grey,
    borderBottomWidth: hp(0.1),
  },
  image: {
    width: wp(35),
    height: hp(5),
  },
  content: {
    fontSize: 22,
    fontWeight: "500",
    color: theme.colors.primary,
    textAlign: "center",
  },
});
