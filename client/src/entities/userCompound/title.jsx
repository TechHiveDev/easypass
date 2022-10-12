import { useRecordContext, useTranslate } from "react-admin";

const UserCompoundTitle = () => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return (
    <span>
      {t("property")} {record.id}
    </span>
  );
};
export default UserCompoundTitle;
