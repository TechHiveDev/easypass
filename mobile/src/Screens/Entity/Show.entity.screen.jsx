import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import MyText from "../../Components/MyText";
import { useGetOneQuery } from "../../API/api";
import globalStyles from "../../Theme/global.styles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// ====================================================================

export default function ShowEntitiyScreen() {
  const { params } = useRoute();
  const { id, entity } = params;
  const { data } = useGetOneQuery({ entity, id });

  // --------------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView style={styles.container}>
        {Object.entries(data || {})?.map(([key, value]) => (
          <View style={styles.row}>
            <MyText text={key + ": "} style={{ fontWeight: "bold" }} />
            <MyText text={value} />
          </View>
        ))}
      </ScrollView>
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
