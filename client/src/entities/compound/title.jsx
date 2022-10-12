import { useRecordContext, useTranslate } from "react-admin";

const CompoundTitle = () => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return (
    <span>
      {t("compound")} {record?.name} ({record.id})
    </span>
  );
};
export default CompoundTitle;
