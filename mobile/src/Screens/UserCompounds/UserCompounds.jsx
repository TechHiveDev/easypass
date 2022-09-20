import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import theme from "../../Theme/paper.theme";
import { useAppDispatch } from "../../Store/redux.hooks";
import { setCompountId } from "../../Store/Slices/auth.slice";
export default function UserCompounds({ navigation }) {
  const dispatch = useAppDispatch();
  // for the global themes Colors
  console.log(theme.colors);

  const compounds = [
    {
      id: 1,
      compoundName: "compound 1",
      compoundDescription: "Desc 1",
    },
    {
      id: 2,
      compoundName: "compound 2",

      compoundDescription: "Desc 2",
    },
    {
      id: 3,
      compoundName: "compound 3",
      compoundDescription: "Desc 3",
    },
    {
      id: 4,
      compoundName: "compound 4",
      compoundDescription: "Desc 4",
    },
  ];

  // handleCompound
  const handleCompoundClicked = (id) => {
    dispatch(setCompountId(id));
    navigation.navigate("HomeStackTabNavigator");
  };
  return (
    <View>
      <View style={styles.header}>
        <Text style={{ marginRight: 10, fontSize: 18 }}>Operator 1</Text>
        <MaterialCommunityIcons
          name="home-plus"
          size={35}
          color={theme.colors.primary}
        />
      </View>

      {/* The Title  */}
      <View>
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
      {/* Rendring The compounds as Grid View */}

      <FlatList
        numColumns={2}
        data={compounds}
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
                  {item.compoundName}
                </Text>
                <Text style={{ color: theme.colors.white, fontSize: 14 }}>
                  {item.compoundDescription}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={[styles.centeredView, { marginVertical: 20 }]}>
        {/* Wrapper  */}
        <TouchableOpacity
          onPress={() => console.log("touchable opacity is been clicked")}
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
    height: 140,
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
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
