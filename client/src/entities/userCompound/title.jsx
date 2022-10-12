import { useRecordContext, useTranslate } from "react-admin";

const UserCompoundTitle = ({ create = false }) => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  return (
    <span>
      {create ? "create" : ""} {t("property").toLowerCase()}{" "}
      {record ? record.id : ""}
    </span>
  );
};
export default UserCompoundTitle;
