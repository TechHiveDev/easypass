const handleOffset = (t) => {
  const newDate = new Date(t);
  const offset = newDate.getTimezoneOffset() * -1; // to get
  newDate.setMinutes(newDate.getMinutes() + offset);
  return newDate.toISOString();
};
export const handleOffsetObject = (t) => {
  const newDate = new Date(t);
  const offset = newDate.getTimezoneOffset() * -1; // to get
  newDate.setMinutes(newDate.getMinutes() + offset);
  return newDate;
};
export default handleOffset;
