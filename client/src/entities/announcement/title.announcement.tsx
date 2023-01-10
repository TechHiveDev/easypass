import { useRecordContext, useTranslate } from "react-admin";

const AnnouncementTitle = ({ create = false }) => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  return (
    <span>
      {create ? t("create") : ""}{" "}
      {create ? t("announcement").replace("ال", "") : t("announcement")}
      {record ? record.id : ""}
    </span>
  );
};
export default AnnouncementTitle;
