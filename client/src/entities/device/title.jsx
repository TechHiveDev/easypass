import { useRecordContext, useTranslate } from "react-admin";

const DeviceTitle = () => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return (
    <span>
      {t("device")} {record.id}
    </span>
  );
};
export default DeviceTitle;
