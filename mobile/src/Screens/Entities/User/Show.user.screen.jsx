import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useGetOneQuery } from "../../../API/api";
import MyText from "../../../Components/MyText";
import globalStyles from "../../../Theme/global.styles";
import ActionButton from "../../../Components/ActionButton";

// ====================================================================

export default function ShowUserScreen() {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { id, entity } = params;
  const { data } = useGetOneQuery({ entity, id });
  const goToEditEntity = () => navigate("EditUserScreen", { id, entity, data });

  // --------------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView style={styles.container}>
        {Object.entries(data || {})?.map(([key, value], index) => (
          <View style={styles.row} key={index}>
            <MyText text={key + ": "} style={{ fontWeight: "bold" }} />
            <MyText text={value} />
          </View>
        ))}
      </ScrollView>
      <ActionButton onPress={goToEditEntity} name="edit" />
    </SafeAreaView>
  );
}

// ====================================================================

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingHorizontal: wp(4),
    paddingVertical: wp(4),
  },
  key: { fontWeight: "bold" },
  row: { flexDirection: "row" },
});
