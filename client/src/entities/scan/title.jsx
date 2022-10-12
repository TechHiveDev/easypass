import { useRecordContext, useTranslate } from "react-admin";

const ScanTitle = () => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return (
    <span>
      {t("scan")} {record.id}
    </span>
  );
};
export default ScanTitle;
