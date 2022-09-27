import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import i18n from "i18n-js";
import theme from "../Theme/paper.theme";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
// ========================================================

const hiddenStatusBar = ["login"];

// ========================================================

export default function MyStatusBar({
  navigation: { goBack, openDrawer },
  route: { name, params },
}) {
  if (hiddenStatusBar.includes(name)) return <></>;

  let back = true;
  let drawer = false;
  let title = params?.title ? params.title : name;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (!params?.title) {
    title = `${i18n.t(title)} ${params?.id ? " - " + params?.id : ""}`;
  }

  if (name === "home" || name == "HomeTabNavigator") title = "Pyramid Heights";

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (
    ["HomeTabNavigator", "exploreGroups", "home", i18n.t("home")].includes(name)
  ) {
    back = false;
    drawer = true;
  }

  if (["Tabs", "login"].includes(name)) back = false;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  // {menu ? <MenuBar /> : false}

  return (
    <Appbar.Header style={styles.header}>
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
      <Appbar.Content title={title} titleStyle={styles.content} />
    </Appbar.Header>
  );
}

// ========================================================

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.white,
  },
  content: {
    fontSize: 22,
    fontWeight: "500",
    alignSelf: "center",
    color: theme.colors.primary,
    marginLeft: -wp(14),
  },
});
