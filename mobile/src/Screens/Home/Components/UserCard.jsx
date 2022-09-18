import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar, Card } from "react-native-paper";
import { useAppSelector } from "../../../Store/redux.hooks";

// ====================================================================

export default function UserCard({ entity, keys, row }) {
  const { name, type } = useAppSelector((state) => state?.auth?.user);

  // -------------------------------

  return (
    <Card style={styles.card}>
      <Card.Title
        left={(props) => (
          <Avatar.Image
            {...props}
            size={50}
            style={styles.image}
            source={require("../../../../assets/logo.png")}
          />
        )}
        right={(props) => (
          <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.address}>{type}</Text>
          </View>
        )}
      />
    </Card>
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
