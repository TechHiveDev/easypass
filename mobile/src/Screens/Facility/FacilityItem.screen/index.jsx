import { SafeAreaView } from "react-native";
import { Agenda } from "react-native-calendars";
import { useMemo, useState } from "react";
import globalStyles from "../../../Theme/global.styles";
import { useRoute } from "@react-navigation/native";
import { renderEmptyDate, RenderItem } from "./Renders";
import { initialItemsGetter, rowHasChanged, minDate } from "./logic";

export default function SingleDiscovery() {
  const { params } = useRoute();
  const dates = useMemo(() => {
    return initialItemsGetter(params.slots);
  }, [params]);
  const [items, setItems] = useState(dates.initialItems);
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

  return (
    <SafeAreaView
      style={[globalStyles.screen, { display: "flex", paddingHorizontal: 0 }]}
    >
      <Agenda
        minDate={minDate}
        markedDates={dates.markedItems}
        items={items}
        disabledByDefault={true}
        // loadItemsForMonth={loadItems}
        loadItemsForMonth={loadItems}
        renderItem={(res) => (
          <RenderItem
            reservation={res}
            title={params.title}
            price={params.price}
            facilityId={params.id}
          />
        )}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
        showOnlySelectedDayItems={true}
      />
    </SafeAreaView>
  );
}
