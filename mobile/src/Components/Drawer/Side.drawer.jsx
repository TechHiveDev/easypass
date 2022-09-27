import { View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useAuthMe } from "../../Utils/auth.hook";
import Button from "../Form/Button";

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

  return (
    <View style={styles.container}>
      {btns?.map(({ name, icon = "", route }, key) => (
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
