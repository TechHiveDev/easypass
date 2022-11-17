import { Card } from "react-native-paper";
import {
  Image,
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
import timeFromString from "../../Utils/timeFromString";
export default function SingleDiscovery() {
  const route = useRoute();
  const { items } = route.params;
  const navigation = useNavigation();
  const clickHandler = (item) => {
    navigation.navigate("DiscoverItem", { title: item.name, ...item });
  };
  return (
    <SafeAreaView
      style={[
        globalStyles.screen,
        {
          backgroundColor: theme.colors.transparentGrey,
        },
      ]}
    >
      <FlashList
        estimatedItemSize={187}
        data={items}
        keyExtractor={(item) => item?.name}
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
                      source={{ uri: item.photoUrl }}
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
                        {timeFromString(item.openDateFrom)} to{" "}
                        {timeFromString(item.openDateTo)}
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