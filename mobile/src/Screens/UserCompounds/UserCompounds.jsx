import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import theme from "../../Theme/paper.theme";
import { useAppDispatch, useAppSelector } from "../../Store/redux.hooks";
import { setCurrentCompound } from "../../Store/Slices/auth.slice";
import { Card } from "react-native-paper";

export default function UserCompounds({ navigation }) {
  const dispatch = useAppDispatch();
  const { userCompound, type } = useAppSelector((state) => state?.auth?.user);
  const handleCompoundClicked = (c) => {
    AsyncStorage.setItem("currentCompound", JSON.stringify(c.id));
    dispatch(setCurrentCompound(c));
    navigation.navigate("HomeStackTabNavigator");
  };
  console.log(userCompound);
  return (
    <SafeAreaView>
      <Text
        style={{
          height: hp(10),
          textAlign: "center",
          paddingTop: hp(5),
          fontSize: 20,
          color: theme.colors.primary,
        }}
      >
        Choose Compound
      </Text>
      <FlatList
        style={{
          height: hp(90),
        }}
        keyExtractor={(item, index) => {
          return (
            item.compoundId +
            item.streetName +
            item.blockNumber +
            item.unitNumber +
            index
          );
        }}
        data={userCompound}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                handleCompoundClicked(item);
              }}
            >
              <Card style={styles.childView}>
                <Card.Cover
                  style={{ height: hp(15) }}
                  source={{ uri: item.logoUrl }}
                  resizeMode={"cover"}
                />
                <Card.Title
                  title={item?.compoundName}
                  titleStyle={{
                    fontSize: item?.compoundName?.length > 25 ? 18 : 22,
                  }}
                  subtitle={
                    type !== "Security"
                      ? `${
                          item?.streetName
                            ? `${item?.streetName} street${
                                item?.blockNumber || item?.unitNumber ? "," : ""
                              }`
                            : ""
                        } ${
                          item?.blockNumber
                            ? `block ${item?.blockNumber}${
                                item?.unitNumber ? "," : ""
                              }`
                            : ""
                        } ${
                          item?.unitNumber ? `unit ${item?.unitNumber}.` : ""
                        }`
                      : ""
                  }
                />
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp(65),
    flexDirection: "row",
    borderWidth: 1,
    marginRight: wp(2),
  },
  title: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    fontWeight: "bold",
  },
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  Title: {
    textAlign: "center",
  },
  shadow: {
    flex: 1,
  },
  childView: {
    // width: wp(80),
    margin: wp(5),
    height: hp(25),
    flex: 1,
    elevation: 10,
  },
  innerChild: {
    textAlign: "left",
    padding: 10,
    paddingLeft: 15,
  },
  addCompound: {
    backgroundColor: theme.colors.primary,
    width: wp(45),
    borderRadius: 6,
    height: hp(7),
    marginVertical: hp(1),
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
