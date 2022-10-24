import { Button, Card, Paragraph } from "react-native-paper";
import {
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import theme from "../../Theme/paper.theme";
import globalStyles from "../../Theme/global.styles";
import { FlashList } from "@shopify/flash-list";
import callPhone from "../../Utils/callPhone";
import { allData } from "./fakeData";

export default function DiscoveryCategoryScreen() {
  const route = useRoute();
  const { title } = route.params;
  return (
    <SafeAreaView style={globalStyles.screen}>
      <FlashList
        estimatedItemSize={187}
        data={allData.find((d) => d.name === title).items}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return (
            <Card
              style={{
                height: hp(22.5),
                marginHorizontal: wp(2),
                marginVertical: hp(2),
              }}
            >
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: wp(5),
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  resizeMode={"cover"}
                  source={{ uri: item.image }}
                  style={{
                    width: wp(30),
                    height: hp(20),
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: wp(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp(5),
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: wp(4),
                      width: wp(30),
                    }}
                  >
                    {item.shortDescription}
                  </Text>
                </View>
                <Button
                  onPress={() => callPhone(item.phone)}
                  style={{
                    marginLeft: wp(5),
                  }}
                >
                  <MaterialCommunityIcons
                    name="phone-outline"
                    size={24}
                    color="black"
                  />
                </Button>
              </View>
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  text: {
    marginTop: hp(4),
    marginHorizontal: wp(3),
    fontSize: wp(5),
  },
  image: { width: wp(100), height: hp(40) },
  background: {
    backgroundColor: theme.colors.white,
  },
});
