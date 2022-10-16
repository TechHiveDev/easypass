import { FunctionField, useTranslate, WrapperField } from "react-admin";

const UserType = () => {
  const t = useTranslate();
  return (
    <FunctionField
      label="type"
      render={(record) => {
        return `${t("userType." + record.type)}`;
      }}
    />
  );
};
export default UserType;
