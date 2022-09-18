import { View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useAuthMe } from "../../Utils/auth.hook";
import Button from "../Form/Button";
import { useAppSelector } from "../../Store/redux.hooks";

// =================================================================

export default function SideDrawer({ navigation: { closeDrawer, navigate } }) {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const { logout } = useAuthMe();
  const profile = useAppSelector((s) => s?.auth?.user);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const btns = [
    // {
    //   name: "search",
    //   icon: "book-search-outline",
    //   onPress: () => {
    //     closeDrawer();
    //     navigate("home");
    //   },
    // },
    // {
    //   name: "profile",
    //   icon: "account",
    //   onPress: () => {
    //     closeDrawer();
    //     navigate("profile", { item: profile });
    //   },
    // },
    // {
    //   name: "myGroups",
    //   icon: "account",
    //   onPress: () => {
    //     closeDrawer();
    //     navigate("groups", { profile, myGroups: true });
    //   },
    // },
    { name: "logout", onPress: () => logout(), icon: "logout" },
  ];

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <View style={styles.container}>
      {btns?.map(({ name, onPress, icon = "" }, key) => (
        <Button
          key={key}
          text={name}
          icon={icon}
          onPress={onPress}
          width={wp(50)}
          maxWidth={wp(50)}
        />
      ))}
    </View>
  );
}

// =================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
