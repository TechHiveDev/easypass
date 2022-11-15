import { useNavigation } from "@react-navigation/native";
import TouchableOpacity from "../../../Components/TouchableOpacity";
import { Card, Text } from "react-native-paper";
import { View } from "moti";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../../Theme/paper.theme";
import { StyleSheet } from "react-native";
import globalStyles from "../../../Theme/global.styles";

export function Facility({ name, icon, ...rest }) {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("FacilityItem", {
      name,
      title: name,
      icon,
      allowBack: true,
      ...rest,
    });
  };
  return (
    <TouchableOpacity onPress={pressHandler}>
      <Card style={styles.card}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: hp(15),
          }}
        >
          <MaterialCommunityIcons
            name={icon}
            size={80}
            color={theme.colors.grey}
          />
        </View>
        <View
          style={{
            width: wp(30),
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    marginVertical: hp(1),
    marginHorizontal: wp(1.5),
    width: hp(22),
    height: hp(22),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: wp(0.1),
    textAlign: "center",
  },
  image: {
    height: hp(20),
  },
  row: {
    ...globalStyles.rowView,
    marginVertical: hp(1),
  },
  col: {
    width: wp(45),
    height: hp(25),
  },
});
