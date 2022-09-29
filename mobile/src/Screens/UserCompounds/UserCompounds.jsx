import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
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

export default function UserCompounds({ navigation }) {
  const dispatch = useAppDispatch();
  const { userCompound, type } = useAppSelector((state) => state?.auth?.user);
  const handleCompoundClicked = (c) => {
    AsyncStorage.setItem("currentCompound", JSON.stringify(c.id));
    dispatch(setCurrentCompound(c));
    navigation.navigate("HomeStackTabNavigator");
  };
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
        numColumns={2}
        data={userCompound}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.childView}
              onPress={() => {
                handleCompoundClicked(item);
              }}
            >
              <View style={styles.innerChild}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: theme.colors.placeholder,
                  }}
                >
                  {item?.compoundName}
                </Text>

                {type !== "Security" ? (
                  <>
                    <Text
                      style={{
                        fontSize: 16,
                        color: theme.colors.placeholder,
                        textAlign: "left",
                      }}
                    >
                      {item?.streetName ? `${item?.streetName} street,` : null}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: theme.colors.placeholder,
                      }}
                    >
                      {item?.blockNumber
                        ? `block ${item?.blockNumber} ,`
                        : null}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: theme.colors.placeholder,
                      }}
                    >
                      {item?.unitNumber ? `unit ${item?.unitNumber}` : null}
                    </Text>
                  </>
                ) : null}
                <Text style={{ color: theme.colors.white, fontSize: 14 }}>
                  {/*{item.compoundDescription}*/}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
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
    height: hp(25),
    flex: 1,
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
