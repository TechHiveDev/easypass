import { Button, Card, Paragraph } from "react-native-paper";
import {
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
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

export default function SingleDiscovery() {
  const route = useRoute();
  const { title } = route.params;
  const navigation = useNavigation();
  const clickHandler = (item) => {
    navigation.navigate("FacilityItem", { title: item.name, ...item });
  };
  return (
    <SafeAreaView style={globalStyles.screen}>
      <FlashList
        estimatedItemSize={187}
        data={allData?.find((d) => d?.name === title)?.items}
        keyExtractor={(item, i) => item?.name + i}
        renderItem={({ item }) => {
          return (
            <Card
              style={{
                marginHorizontal: wp(2),
                marginVertical: hp(2),
                overflow: "hidden",
                padding: wp(3),
              }}
            >
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View>
                  <TouchableOpacity onPress={() => clickHandler(item)}>
                    <Image
                      resizeMode={"cover"}
                      source={{ uri: item.image }}
                      style={{
                        width: wp(35),
                        height: wp(35),
                        borderRadius: wp(35 / 2),
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => callPhone(item.phone)}
                    style={{
                      position: "absolute",
                      bottom: -hp(0.5),
                      left: wp(0),
                      width: wp(8),
                      height: wp(8),
                      borderRadius: wp(4),
                      backgroundColor: theme.colors.grey,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="phone-outline"
                      size={15}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => clickHandler(item)}>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      marginLeft: wp(5),
                      width: wp(40),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: wp(6.5),
                        fontWeight: "bold",
                        color: theme.colors.primary,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: wp(4),
                      }}
                    >
                      {item.shortDescription}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="clock-time-two-outline"
                        size={15}
                        color={theme.colors.primary}
                        style={{
                          marginTop: hp(0.2),
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: wp(0.5),
                          fontSize: wp(3.5),
                        }}
                      >
                        {item.from} to {item.to}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
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
