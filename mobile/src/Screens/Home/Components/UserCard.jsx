import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar, Card } from "react-native-paper";
import { useAppSelector } from "../../../Store/redux.hooks";
import { useNavigation } from "@react-navigation/native";

// ====================================================================

export default function UserCard({ entity, keys, row }) {
  const { name, type, photoUrl, email, phone } = useAppSelector(
    (state) => state?.auth?.user
  );
  const navigate = useNavigation();
  const currentCompound = useAppSelector(
    (state) => state?.auth?.currentCompound
  );
  // -------------------------------

  return (
    <TouchableOpacity
      onPress={() => navigate.navigate("Profile")}
      activeOpacity={0.75}
    >
      <Card style={styles.card}>
        <Card.Title
          left={(props) => (
            <Avatar.Image
              {...props}
              size={50}
              style={styles.image}
              source={
                photoUrl
                  ? { uri: photoUrl }
                  : require("../../../../assets/profile.png")
              }
            />
          )}
          right={(props) => (
            <View style={styles.content}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.address}>{type}</Text>
              {type === "Security" ? (
                <>
                  <Text style={styles.address}>email: {email}</Text>
                  <Text style={styles.address}>phone: {phone}</Text>
                  <Text style={styles.address}>
                    current compound: {currentCompound.compoundId}
                  </Text>
                </>
              ) : null}
            </View>
          )}
        />
      </Card>
    </TouchableOpacity>
  );
}

// ====================================================================

const styles = StyleSheet.create({
  card: {
    width: wp(92),
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: hp(0.2),
    paddingHorizontal: wp(1),
    marginHorizontal: wp(1),
  },
  content: {
    width: wp(68),
    color: "grey",
  },
  name: {
    fontWeight: "600",
    fontSize: wp(4),
  },
  address: {
    color: "grey",
  },
});
