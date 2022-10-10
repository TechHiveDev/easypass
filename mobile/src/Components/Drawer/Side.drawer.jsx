import { View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useAuthMe } from "../../Utils/auth.hook";
import Button from "../Form/Button";
import { useAppSelector } from "../../Store/redux.hooks";
import { useMemo } from "react";

// =================================================================

const btns = [
  {
    name: "My Compounds",
    icon: "home-group",
    route: "UserCompounds",
  },
];
export default function SideDrawer({ navigation: { closeDrawer, navigate } }) {
  const { logout } = useAuthMe();
  const userCompoundsLength = useAppSelector(
    (state) => state?.auth?.user?.userCompound?.length
  );
  const btnFiltered = useMemo(() => {
    return btns?.filter(
      (b) => !(userCompoundsLength === 1 && b.name !== "UserCompounds")
    );
  }, [userCompoundsLength]);
  return (
    <View style={styles.container}>
      {btnFiltered?.map(({ name, icon = "", route }, key) => (
        <Button
          key={key}
          text={name}
          icon={icon}
          onPress={() => navigate(route)}
          width={wp(50)}
          maxWidth={wp(50)}
        />
      ))}
      <Button
        text={"Logout"}
        icon={"logout"}
        onPress={() => logout()}
        width={wp(50)}
        maxWidth={wp(50)}
      />
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
