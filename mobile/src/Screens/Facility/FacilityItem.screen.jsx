import { Button, Text } from "react-native-paper";
import { StyleSheet, SafeAreaView, View, Alert } from "react-native";
import { Agenda } from "react-native-calendars";
import { useState } from "react";
import globalStyles from "../../Theme/global.styles";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};
const renderEmptyDate = () => {
  return (
    <View style={styles.item}>
      <Text>No available slots here!</Text>
    </View>
  );
};

const minDate = timeToString(new Date());
const markedItems = {
  "2022-10-31": {
    marked: true,
    disabled: false,
  },
  "2022-11-01": {
    marked: true,
    disabled: false,
  },
  "2022-11-02": {
    marked: true,
    disabled: false,
  },
  "2022-11-03": {
    marked: true,
  },
};
const initItems = {
  "2022-10-31": [
    { name: "item 1 - any js object", from: "1:00 pm", to: "4:00 pm" },
    { name: "item 1* - any js object", from: "5:00 pm", to: "8:00 pm" },
  ],
  "2022-11-01": [
    { name: "item 2 - any js object", from: "1:00 pm", to: "4:00 pm" },
    { name: "item 2* - any js object", from: "5:00 pm", to: "7:00 pm" },
  ],
  "2022-11-02": [
    { name: "item 3 - any js object", from: "7:00 pm", to: "8:00 pm" },
  ],
  "2022-11-03": [
    { name: "item 4 - any js object", from: "8:00 pm", to: "9:00 pm" },
  ],
};
export default function SingleDiscovery() {
  const [items, setItems] = useState(initItems);
  const loadItems = (day) => {
    const { dateString } = day;
    if (dateString in items) return;
    setItems((old) => {
      return {
        ...old,
        [dateString]: [],
      };
    });
  };
  const renderItem = (reservation) => {
    const fontSize = 14;
    const color = "#43515c";

    return (
      <View style={[styles.item]}>
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
        <Text style={{ fontSize, color }}>from: {reservation.from}</Text>
        <Text style={{ fontSize, color }}>to: {reservation.to}</Text>
        <Button onPress={() => Alert.alert(reservation.name)}>
          Request Service
        </Button>
      </View>
    );
  };
  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };
  return (
    <SafeAreaView
      style={[globalStyles.screen, { display: "flex", paddingHorizontal: 0 }]}
    >
      <Agenda
        minDate={minDate}
        markedDates={markedItems}
        items={items}
        disabledByDefault={true}
        // loadItemsForMonth={loadItems}
        loadItemsForMonth={loadItems}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
        showOnlySelectedDayItems={true}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
