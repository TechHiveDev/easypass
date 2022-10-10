import { useRecordContext } from "react-admin";

const AnnouncementTitle = () => {
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return <span>Announcement {record.id}</span>;
};
export default AnnouncementTitle;
