import handleOffset from "../../../Utils/handleOffset";

export const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};
export const rowHasChanged = (r1, r2) => {
  return r1.from + r2.to !== r2.from + r2.to;
};
export const minDate = timeToString(new Date());

export const initialItemsGetter = (slots) => {
  // first get unique dates
  const slotDates = [...new Set(slots.map((s) => s.from.split("T")[0]))];
  // then make an object with this dates like { "2022-11-02": [], "2022-11-03": [] } (object of arrays)
  let initialItems = slotDates.reduce((ac, a) => ({ ...ac, [a]: [] }), {});
  // and an object to mark the days  {"2022-11-02": {marked: true,disabled: false,}}
  let markedItems = slotDates.reduce(
    (ac, a) => ({
      ...ac,
      [a]: {
        marked: true,
        disabled: false,
      },
    }),
    {}
  );
  // then populate the arrays inside the initialItems object
  slots.forEach((s) => {
    const date = s.from.split("T")[0];
    const from = handleOffset(s.from).split("T")[1];
    const to = handleOffset(s.to).split("T")[1];
    const fromAPI = s.from;
    const toAPI = s.to;
    if (date in initialItems) {
      initialItems[date].push({
        date,
        from,
        to,
        available: s.available,
        fromAPI,
        toAPI,
      });
    }
  });
  if (minDate in initialItems) return { initialItems, markedItems };
  initialItems[minDate] = [];
  return { initialItems, markedItems };
};
