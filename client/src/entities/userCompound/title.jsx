import { useRecordContext } from "react-admin";

const UserCompoundTitle = () => {
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return <span>User Compound {record.id}</span>;
};
export default UserCompoundTitle;
