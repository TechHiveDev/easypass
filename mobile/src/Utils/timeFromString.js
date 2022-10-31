const timeFromString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[1].substring(0, 5);
};
export default timeFromString;
