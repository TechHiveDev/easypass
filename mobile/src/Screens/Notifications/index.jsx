import React, { useEffect, useMemo } from "react";
import globalStyles from "../../Theme/global.styles";
import { View } from "react-native";
import { useGetListQuery } from "../../API/api";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import { Text } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import Notification from "./Notification";
import formatData from "./formatData";

const ListEmptyComponent = () => <Text>No Upcoming reservations</Text>;

const Notifications = () => {
  const userId = useSelector((s) => s.auth.user.id);
  const { data, error, isLoading, isFetching, refetch } = useGetListQuery({
    entity: `request/user/${userId}`,
  });
  const formattedData = useMemo(() => formatData(data), [data]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFetching && isFocused) {
      refetch();
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
          if (isFetching) {
            refetch();
          }
        }}
        estimatedItemSize={123}
        keyExtractor={(item) => item.id}
        data={formattedData}
        renderItem={({ item }) => {
          return <Notification item={item} />;
        }}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default Notifications;
