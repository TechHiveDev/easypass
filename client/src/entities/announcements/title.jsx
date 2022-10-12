import { useRecordContext, useTranslate } from "react-admin";

const AnnouncementTitle = () => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return (
    <span>
      {t("announcement")} {record.id}
    </span>
  );
};
export default AnnouncementTitle;
