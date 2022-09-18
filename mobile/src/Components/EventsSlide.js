import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { colors, globalStyles } from "../Config/style";
import { useNavigation } from "@react-navigation/native";
import EventCard from "./EventCard";
import LoadingScreen from "../Screens/Generic/Loading.screen";

// ====================================================================

function LoadingFooter(isLoading) {
  return isLoading ? <ActivityIndicator /> : null;
}

// ====================================================================

export default function EventsSlide({
  events = [],
  type = "upcoming",
  isFetching = false,
  isLoading = false,
}) {
  // ----------------------------------------------
  const { navigate } = useNavigation();

  return (
    <View style={{ ...globalStyles.hostScreenSection }}>
      <Text style={styles.text}>
        {type === "past" ? "Past Events" : "Events"}
      </Text>
      {isLoading ? (
        <LoadingScreen />
      ) : events?.length ? (
        <SafeAreaView style={styles.container}>
          <FlatList
            horizontal={true}
            data={events}
            // keyExtractor={(item) => item.id}
            ListFooterComponent={<LoadingFooter isLoading={isLoading} />}
            // onEndReached={loadMore}
            renderItem={({ item, index, separators }) => (
              <TouchableOpacity
                onPress={() => navigate("EventDetails", { event: item })}
              >
                <EventCard
                  key={index}
                  {...item}
                  hideAttributes={true}
                  hideGoing={false}
                  hideLocation={false}
                  hideIntersets={true}
                  hidePrice={true}
                />
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      ) : (
        <Text style={styles.noEvents}>
          {type === "past" ? "Past Events" : "Empty Events"}
        </Text>
      )}
    </View>
  );
}

// ====================================================================

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -wp("5%"),
  },
  text: {
    color: colors.mainColor,
    fontWeight: "bold",
    fontSize: RFValue(25, 1024),
  },
  noEvents: {
    textAlign: "right",
    color: colors.mainColor,
    fontSize: RFValue(20, 1024),
  },
});
