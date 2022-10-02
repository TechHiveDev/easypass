import { useRecordContext } from "react-admin";

const DeviceTitle = () => {
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return <span>Device {record.id}</span>;
};
export default DeviceTitle;
