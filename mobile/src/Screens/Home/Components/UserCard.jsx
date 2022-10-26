import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import { useAppSelector } from "../../../Store/redux.hooks";
import { useNavigation } from "@react-navigation/native";
import QrCode from "../../../Components/QrCode";

// ====================================================================

export default function UserCard({ entity, keys, row }) {
  const { name, type, photoUrl, email, phone } = useAppSelector(
    (state) => state?.auth?.user
  );
  const navigate = useNavigation();
  const currentCompound = useAppSelector(
    (state) => state?.auth?.currentCompound
  );

  return (
    <Card style={styles.card}>
      <Card.Title
        left={(props) => (
          <View
            style={{
              width: wp(33),
              height: hp(25.2),
            }}
          >
            <TouchableOpacity
              onPress={() => navigate.navigate("Profile")}
              activeOpacity={0.75}
            >
              <Image
                {...props}
                style={styles.image}
                source={
                  photoUrl
                    ? { uri: photoUrl }
                    : require("../../../../assets/profile.png")
                }
              />
            </TouchableOpacity>
            {/*<View*/}
            {/*  style={{*/}
            {/*    height: hp(2.2),*/}
            {/*  }}*/}
            {/*/>*/}
            <TouchableOpacity
              onPress={() => navigate.navigate("Profile")}
              activeOpacity={0.75}
            >
              <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
          </View>
        )}
        right={(props) => {
          return (
            <View
              style={{
                marginLeft: wp(5),
                paddingTop: hp(1),
              }}
            >
              <QrCode />
            </View>
          );
        }}
      />
    </Card>
  );
}

// ====================================================================

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 7,
    padding: 0,
  },
  name: {
    fontWeight: "600",
    fontSize: wp(4),
    marginVertical: hp(1),
    width: wp(30),
  },
  address: {
    color: "grey",
  },
  image: {
    height: wp(45),
    width: wp(35),
  },
});
