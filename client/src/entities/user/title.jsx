import { useRecordContext, useTranslate } from "react-admin";

const UserTitle = ({ create = false }) => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  return (
    <span>
      {create ? t("create") : ""}{" "}
      {create ? t("user").replace("ال", "") : t("user")}
      {record ? record?.name : ""}
      {record ? `(${record.id})` : ""}
    </span>
  );
};
export default UserTitle;
