import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import MyText from "../../Components/MyText";
import Card from "../../Components/Card";
import { useGetListQuery } from "../../API/api";
import globalStyles from "../../Theme/global.styles";
import LoadingOrErrorScreeen from "../../Components/LoadingOrError.screen";

// ====================================================================

export default function ListEntityScreen() {
  const { params } = useRoute();
  const { entity } = params;
  const { data, isFetching, error } = useGetListQuery({ entity });

  // --------------------------------------

  if (isFetching || error) {
    return <LoadingOrErrorScreeen {...{ error, isFetching }} />;
  }

  // --------------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView>
        {data?.map((row, rowIdx) => {
          let keys = Object.keys(row).filter(
            (k) => !["createdAt", "updatedAt"].includes(k)
          );
          return <Card key={rowIdx} {...{ entity, keys, row }} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
