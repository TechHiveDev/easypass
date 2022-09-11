import { TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import MyText from "./MyText";
import { capitalize } from "../Utils/string.util";
// ====================================================================

export default function Card({ entity, keys, row }) {
  const { navigate } = useNavigation();
  const { id } = row;
  const show = () => navigate(`Show${capitalize(entity)}Screen`, { id });

  return (
    <TouchableOpacity style={styles.card} onPress={show}>
      {keys.map((key, index) => (
        <MyText key={index} text={row[key]} />
      ))}
    </TouchableOpacity>
  );
}

// ====================================================================

const styles = StyleSheet.create({
  card: {
    width: wp(98),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    marginVertical: hp(0.7),
    marginHorizontal: wp(1),
  },
});
