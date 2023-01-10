import { useRecordContext, useTranslate } from "react-admin";

const InvitationTitle = () => {
  const t = useTranslate();
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return (
    <span>
      {t("invite")} {record.id}
    </span>
  );
};
export default InvitationTitle;
