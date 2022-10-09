import { useRecordContext } from "react-admin";

const ScanTitle = () => {
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return <span>Scan {record.id}</span>;
};
export default ScanTitle;
