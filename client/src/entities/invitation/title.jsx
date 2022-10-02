import { useRecordContext } from "react-admin";

const InvitationTitle = () => {
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return <span>Invitation {record.id}</span>;
};
export default InvitationTitle;
