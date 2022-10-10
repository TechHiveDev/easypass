import { useRecordContext } from "react-admin";

const CompoundTitle = () => {
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return (
    <span>
      Compound {record?.name} ({record.id})
    </span>
  );
};
export default CompoundTitle;
