import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import theme from "../../Theme/paper.theme";
import { useAppDispatch, useAppSelector } from "../../Store/redux.hooks";
import { setCompountId } from "../../Store/Slices/auth.slice";

export default function UserCompounds({ navigation }) {
  const dispatch = useAppDispatch();
  const { userCompound } = useAppSelector((state) => state?.auth?.user);

  // handleCompound
  const handleCompoundClicked = (id) => {
    dispatch(setCompountId(id));
    navigation.navigate("HomeStackTabNavigator");
  };
  const navigateToCompoundList = () => {
    navigation.navigate("CompoundsList");
  };
  return (
    <View>
      {/* The Title  */}
      <View
        style={{
          height: hp(10),
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginVertical: 20,
            color: theme.colors.primary,
          }}
        >
          Choose Compound
        </Text>
      </View>
      <FlatList
        style={{
          height: hp(80),
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
        numColumns={2}
        data={userCompound}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.childView}
              onPress={() => {
                handleCompoundClicked(item.id);
              }}
            >
              <View style={styles.innerChild}>
                <Text style={{ fontSize: 20, color: theme.colors.placeholder }}>
                  compound {item.compoundId}, street {item.streetName} , block{" "}
                  {item.blockNumber}, unit {item.unitNumber}
                </Text>
                <Text style={{ color: theme.colors.white, fontSize: 14 }}>
                  {/*{item.compoundDescription}*/}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View style={[styles.centeredView]}>
        {/* Wrapper  */}
        <TouchableOpacity
          onPress={navigateToCompoundList}
          style={styles.addCompound}
        >
          <MaterialCommunityIcons name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  childView: {
    backgroundColor: theme.colors.primary,
    width: wp(45),
    margin: wp(5),
    borderRadius: 6,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  innerChild: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
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
