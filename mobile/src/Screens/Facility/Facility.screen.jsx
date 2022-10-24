import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Text } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import globalStyles from "../../Theme/global.styles";
import { useAppSelector } from "../../Store/redux.hooks";
import { useGetListQuery } from "../../API/api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../Theme/paper.theme";
import { View } from "moti";
import { FlashList as FlatList } from "@shopify/flash-list";

function Discover({ name, icon }) {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("SingleFacilityCategory", {
      title: name,
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

// =================================================================
const fakeData = [
  {
    name: "Banking and Insurance",
    icon: "bank",
  },
  {
    name: "Groceries",
    icon: "cart-outline",
  },
  {
    name: "Places to Eat",
    icon: "food",
  },
  {
    name: "Pharmacies",
    icon: "pill",
  },
  {
    name: "Pet Care",
    icon: "dog-side",
  },
];
export default function FacilityScreen() {
  // const currentCompoundId = useAppSelector(
  //   (state) => state?.auth?.currentCompound?.compoundId
  // );
  // const { data, isFetching, refetch, error, isLoading } = useGetListQuery({
  //   entity: `discover/compound/${currentCompoundId}`,
  // });
  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   if (isFocused && !isFetching) refetch();
  // }, [isFocused]);
  // if (isLoading || error || !data?.length) return null;
  return (
    <SafeAreaView style={globalStyles.screen}>
      {/*<ScrollView>*/}
      {/*  {fakeData?.map((d, index) => (*/}
      {/*    <Discover key={index} {...d} />*/}
      {/*  ))}*/}
      {/*</ScrollView>*/}
      <FlatList
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
  card: {
    marginVertical: hp(1),
    marginHorizontal: wp(3),
    width: wp(42),
    height: hp(25),
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
