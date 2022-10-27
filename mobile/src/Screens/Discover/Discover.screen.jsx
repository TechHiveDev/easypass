import { SafeAreaView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import globalStyles from "../../Theme/global.styles";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../Theme/paper.theme";
import { View } from "moti";
import { FlashList } from "@shopify/flash-list";
import { fakeData } from "./fakeData";
import TouchableOpacity from "../../Components/TouchableOpacity";

function Discover({ name, icon }) {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("SingleDiscoverCategory", {
      title: name,
    });
  };
  return (
    <TouchableOpacity onPress={pressHandler}>
      <Card style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={icon}
            size={80}
            color={theme.colors.grey}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.boldText}>{name}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

// =================================================================

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <FlashList
        data={fakeData}
        renderItem={({ item }) => <Discover {...item} />}
        keyExtractor={(item) => item.icon}
        estimatedItemSize={50}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...globalStyles.screen,
    backgroundColor: theme.colors.transparentGrey,
  },
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
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: hp(15),
  },
  nameContainer: {
    width: wp(30),
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
});
