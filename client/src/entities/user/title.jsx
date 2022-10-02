import { useRecordContext } from "react-admin";

const UserTitle = () => {
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return <span>User {record.id}</span>;
};
export default UserTitle;
