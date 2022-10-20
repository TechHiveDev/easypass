const dateFormatter = (date) => {
  const locale = JSON.parse(localStorage.getItem("RaStore.locale")) || "en";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "full", // full or long or medium or short
    timeStyle: "short", // full or long or medium or short
  }).format(new Date(date));
};
export default dateFormatter;
export const dayEqualityChecker = (date1, date2) => {
  const locale = JSON.parse(localStorage.getItem("RaStore.locale")) || "en";
  return (
    new Intl.DateTimeFormat(locale, {
      dateStyle: "full", // full or long or medium or short
    }).format(new Date(date1)) ===
    new Intl.DateTimeFormat(locale, {
      dateStyle: "full", // full or long or medium or short
    }).format(new Date(date2))
  );
};
export const daysMergerWithTime = (date1, date2) => {
  const locale = JSON.parse(localStorage.getItem("RaStore.locale")) || "en";
  const isEnglish = locale === "en";
  const dateFormat = new Intl.DateTimeFormat(locale, {
    dateStyle: "full", // full or long or medium or short
  });
  const timeFormat = new Intl.DateTimeFormat(locale, {
    timeStyle: "short", // full or long or medium or short
  });
  if (!dayEqualityChecker(date1, date2))
    return (
      dateFormatter(date1) +
      `${isEnglish ? " to " : " الي "}` +
      dateFormatter(date2)
    );
  const from = timeFormat.format(new Date(date1));
  const to = timeFormat.format(new Date(date2));
  const samePeriod = from.slice(-2) === to.slice(-2);
  return (
    dateFormat.format(new Date(date1)) +
    `${isEnglish ? " from " : " من "}` +
    `${samePeriod ? from.slice(0, -2) : from}` +
    `${isEnglish ? " to " : " الي "}` +
    to
  );
};