import { FunctionField, useTranslate } from "react-admin";

export default function UserType() {
  const t = useTranslate();
  return (
    <FunctionField
      label="type"
      render={(record: any) => {
        return `${t("userType." + record.type)}`;
      }}
    />
  );
}
