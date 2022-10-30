import { StyleSheet, Image } from "react-native";
import { Appbar } from "react-native-paper";
import i18n from "i18n-js";
import theme from "../Theme/paper.theme";
import config from "../Config/config";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import splash from "../../assets/splash.png";
// ========================================================

const hiddenStatusBar = ["login"];
const defaultTitleAndButton = [
  "Home",
  "Profile",
  "Facilities",
  "Invite",
  "AllDiscoverCategories",
  "AllFacilityCategories",
];
// ========================================================

export default function MyStatusBar({
  navigation: { goBack, openDrawer },
  route: { name, params },
}) {
  if (hiddenStatusBar.includes(name)) return <></>;

  let back = true;
  let drawer = false;
  let title = params?.title ? params.title : name;

  if (
    name === "home" ||
    name === "HomeTabNavigator" ||
    defaultTitleAndButton.includes(name) ||
    !name
  )
    title = config.name;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (
    ["HomeTabNavigator", "exploreGroups", "home", i18n.t("home")]
      .concat(defaultTitleAndButton)
      .includes(name)
  ) {
    back = false;
    drawer = true;
  }

  if (["Tabs", "login"].includes(name)) back = false;

  return (
    <Appbar.Header style={styles.header} statusBarHeight={hp(3.5)}>
      {back && (
        <Appbar.BackAction onPress={goBack} color={theme.colors.primary} />
      )}
      {drawer && (
        <Appbar.Action
          size={30}
          icon="menu"
          onPress={openDrawer}
          color={theme.colors.primary}
        />
      )}
      {title === config.name ? (
        <Image source={splash} resizeMode={"contain"} style={styles.image} />
      ) : (
        <Appbar.Content title={title} titleStyle={styles.content} />
      )}
    </Appbar.Header>
  );
}

// ========================================================

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.white,
  },
  image: {
    width: wp(35),
    height: hp(5),
    marginLeft: wp(15),
  },
  content: {
    fontSize: 22,
    fontWeight: "500",
    alignSelf: "center",
    color: theme.colors.primary,
    marginLeft: -wp(14),
  },
});
