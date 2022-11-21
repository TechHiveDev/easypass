import React, { useEffect, useMemo } from "react";
import globalStyles from "../../../Theme/global.styles";
import { View } from "react-native";
import { useGetListQuery } from "../../../API/api";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import { Request } from "../Request";
import { Text } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

const groupBy = (xs, key) => {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const newDate = new Date();
const currentDate = newDate.toISOString();

const ListEmptyComponent = () => <Text>No Past Requests</Text>;

let counter = 0;

const Past = () => {
  const userId = useSelector((s) => s.auth.user.id);
  const { data, error, isLoading, isFetching, refetch } = useGetListQuery({
    entity: `request/user/${userId}`,
    filter: {
      availableDateFrom: { lte: currentDate },
    },
  });
  const formattedData = useMemo(
    () =>
      data
        ? groupBy(
            data
              ?.filter((d) => {
                return d.status !== "cancelled";
              })
              ?.map((d) => {
                return { ...d, date: d?.availableDateFrom.split("T")[0] };
              }),
            "date"
          )
        : {},
    [data]
  );
  const sortedItems = useMemo(
    () =>
      Object.keys(formattedData).sort((a, b) => {
        return new Date(b).getTime() - new Date(a).getTime();
      }),
    [formattedData]
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFetching && isFocused) {
      refetch();
      console.log("past facilities fetch count on focus is ", ++counter);
    }
  }, [isFocused]);
  if (!data || isLoading || error) {
    return null;
  }
  return (
    <View style={globalStyles.screen}>
      <FlashList
        refreshing={isFetching ?? false}
        onRefresh={() => {
          if (!isFetching) {
            refetch();
          }
        }}
        estimatedItemSize={123}
        keyExtractor={(item) => item}
        data={sortedItems}
        renderItem={({ item }) => {
          return (
            <Request date={item} list={formattedData[item]} cancel={false} />
          );
        }}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default Past;
