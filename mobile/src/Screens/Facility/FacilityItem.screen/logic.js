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
    //handle offset dynamically
    const fromDate = new Date(s.from);
    const offset = fromDate.getTimezoneOffset() / -60; // to get hours
    fromDate.setHours(fromDate.getHours() + offset);
    const toDate = new Date(s.to);
    toDate.setHours(toDate.getHours() + offset);
    const from = fromDate.toISOString().split("T")[1];
    const to = toDate.toISOString().split("T")[1];
    if (date in initialItems) {
      initialItems[date].push({
        date,
        from,
        to,
        available: s.available,
      });
    }
  });
  if (minDate in initialItems) return { initialItems, markedItems };
  initialItems[minDate] = [];
  return { initialItems, markedItems };
};
