import React from "react";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native";
import { Facility } from "./Facility";
import { useListContext } from "../../../Navigators/FacilityContext";
import globalStyles from "../../../Theme/global.styles";
import theme from "../../../Theme/paper.theme";
import { Text } from "react-native-paper";

const ListEmptyComponent = () => <Text>No Facilities yet</Text>;

export default function FacilityScreen() {
  const { data, error, isLoading, refetch, isFetching } = useListContext();
  if (error || isLoading) return <></>;
  return (
    <SafeAreaView
      style={[
        globalStyles.screen,
        {
          backgroundColor: theme.colors.transparentGrey,
          padding: 0,
        },
      ]}
    >
      <FlashList
        onRefresh={() => {
          if (!isFetching) {
            refetch();
          }
        }}
        refreshing={isFetching ?? false}
        data={data}
        renderItem={({ item }) => <Facility {...item} />}
        keyExtractor={(item) => item.name}
        estimatedItemSize={50}
        numColumns={2}
        ListEmptyComponent={ListEmptyComponent}
      />
    </SafeAreaView>
  );
}
