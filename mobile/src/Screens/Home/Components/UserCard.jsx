import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAppSelector } from "../../../Store/redux.hooks";
import { useNavigation } from "@react-navigation/native";
import QrCode from "../../../Components/QrCode";
import theme from "../../../Theme/paper.theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
let notificationCount = 4;
export default function UserCard() {
  const currentCompound = useAppSelector(
    (state) => state?.auth?.currentCompound
  );
  const { name, photoUrl } = useAppSelector((state) => state?.auth?.user);
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            style={styles.avatar}
            source={
              photoUrl
                ? { uri: photoUrl }
                : require("../../../../assets/profile.png")
            }
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.welcomeText}>Welcome Back,</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.welcomeText}>{name.split(" ")[0]}!</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: wp(25),
            marginTop: hp(1.5),
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("NotificationsScreen", {
                title: "Notifcations",
                allowBack: true,
              })
            }
          >
            <MaterialCommunityIcons
              name="bell"
              size={24}
              color={theme.colors.primary}
            />
            {notificationCount > 0 ? (
              <View
                style={{
                  position: "absolute",
                  width: wp(5),
                  height: wp(5),
                  zIndex: 3,
                  backgroundColor: "white",
                  borderColor: theme.colors.primary,
                  borderWidth: wp(0.5),
                  borderRadius: wp(2.5),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  top: -hp(0.5),
                  right: -wp(1),
                }}
              >
                <Text
                  style={{
                    fontSize: wp(2.5),
                  }}
                >
                  {notificationCount}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.qrCodeContainer}>
        <QrCode />
        <View
          style={{
            backgroundColor: theme.colors.primary,
            width: wp(94.5),
            height: hp(5),
            textAlign: "center",
            marginTop: -hp(3),
          }}
        >
          <Text
            style={{
              textAlign: "left",
              color: "white",
              marginTop: hp(1),
            }}
          >
            {"  "}
            {currentCompound?.compoundName}
          </Text>
        </View>
      </View>
    </>
  );
}

// ====================================================================

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: wp(94.5),
    padding: wp(2),
    borderRadius: wp(2),
    backgroundColor: theme.colors.white,
    borderWidth: wp(0.2),
    borderColor: theme.colors.grey,
  },
  avatar: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(15 / 2),
    borderWidth: wp(0.5),
    borderColor: theme.colors.primary,
    marginRight: wp(2),
  },
  qrCodeContainer: {
    marginTop: hp(2),
    borderWidth: wp(0.2),
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.white,
    borderRadius: wp(5),
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: wp(94.5),
  },
  welcomeText: {
    fontSize: wp(5),
    fontWeight: "bold",
  },
});
