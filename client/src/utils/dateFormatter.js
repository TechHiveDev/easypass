const dateFormatter = (date) => {
  const locale = JSON.parse(localStorage.getItem("RaStore.locale")) || "en";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "full", // full or long or medium or short
    timeStyle: "short", // full or long or medium or short
  }).format(new Date(date));
};
export default dateFormatter;
