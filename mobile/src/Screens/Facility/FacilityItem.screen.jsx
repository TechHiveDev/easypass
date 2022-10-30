import { Button, Paragraph, Text } from "react-native-paper";
import {
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import theme from "../../Theme/paper.theme";
import globalStyles from "../../Theme/global.styles";
import callPhone from "../../Utils/callPhone";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Agenda, Calendar } from "react-native-calendars/src/index";
import { useState } from "react";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};
const renderEmptyDate = () => {
  return (
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
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
    { name: "item 1 - any js object" },
    { name: "item * - any js object" },
  ],
  "2022-11-01": [{ name: "item 2 - any js object" }],
  "2022-11-02": [{ name: "item 3 - any js object" }],
  "2022-11-03": [{ name: "item 4 - any js object" }],
};
export default function SingleDiscovery() {
  const route = useRoute();
  const { image, description, phone, from, to, address } = route.params;
  const [items, setItems] = useState(initItems);
  const loadItems = (day) => {
    return Promise.resolve();
  };
  const renderItem = (reservation, isFirst) => {
    const fontSize = 14;
    const color = "#43515c";

    return (
      <View
        style={[
          styles.item,
          // { height: reservation.height }
        ]}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
        <Text style={{ fontSize, color }}>from: {reservation.from}</Text>
        <Text style={{ fontSize, color }}>to: {reservation.to}</Text>
        <Button onPress={() => Alert.alert(reservation.name)}> Request</Button>
      </View>
    );
  };
  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };
  return (
    <SafeAreaView style={[globalStyles.screen, { paddingHorizontal: 0 }]}>
      <Agenda
        minDate={minDate}
        markedDates={markedItems}
        items={items}
        disabledByDefault={true}
        // loadItemsForMonth={loadItems}
        // loadItemsForMonth={loadItems}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
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
