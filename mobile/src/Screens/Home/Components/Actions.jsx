import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MyText from "../../../Components/MyText";
import { Avatar } from "react-native-paper";
import i18n from "i18n-js";
import { useNavigation } from "@react-navigation/native";

// ====================================================================

// Static Data
const actions = [
  {
    title: "facilities",
    navigateTo: "facilities",
  },
  {
    title: "qrcode",
    navigateTo: "qrcode",
  },
  {
    title: "invite",
    navigateTo: "invite",
  },
  // {
  //   title: "report",
  //   navigateTo: "facilities",
  // },
];

// ====================================================================

function Action({ title, navigateTo }) {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      style={styles.action}
      onPress={() => navigate(navigateTo)}
    >
      <View style={styles.imgContainer}>
        <Avatar.Icon
          size={70}
          style={styles.iconContainer}
          icon={({ size }) => (
            <Image
              source={require("../../../../assets/logo.png")}
              style={{ width: size, height: size }}
            />
          )}
        />
      </View>
      <MyText text={i18n.t(title)} />
    </TouchableOpacity>
  );
}

// ====================================================================

export default function Actions() {
  return (
    <SafeAreaView style={styles.container}>
      {actions?.map(({ title, navigateTo }, index) => (
        <Action key={index} {...{ title, navigateTo }} />
      ))}
    </SafeAreaView>
  );
}
// ====================================================================

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: wp(95),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: wp(2),
  },
  action: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp(2),
  },
  iconContainer: {
    backgroundColor: "#edede9",
    marginVertical: hp(1),
  },
});
