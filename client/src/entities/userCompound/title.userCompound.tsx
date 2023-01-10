import { useRecordContext, useTranslate } from "react-admin";

const UserCompoundTitle = ({ create = false }) => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  return (
    <span>
      {create ? t("create") : ""}{" "}
      {create ? t("property").replace("ال", "") : t("property")}&nbsp;
      {record ? record.id : ""}
    </span>
  );
};
export default UserCompoundTitle;
