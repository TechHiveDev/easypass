import { Admin, Resource, usePermissions } from "react-admin";
import entities from "../../entities/entities";
import i18nProvider from "../../utils/translation/i18nProvider";
import { authProvider } from "../providers/auth.provider.hook";
import { dataProvider } from "../providers/data.provider.hook";
import MyLayout from "./MyLayout";
import SignUp from "../../custom-views/Signup";

// =======================================================

export default function MyAdmin() {
  const type = JSON.parse(localStorage.getItem("user"))?.type;
  return (
    <Admin
      layout={MyLayout}
      {...{ i18nProvider, dataProvider, authProvider }}
      loginPage={<SignUp />}
    >
      {entities.map(({ label, ...rest }) => {
        if (label === "User" && type !== "Admin") {
          const { create, ...others } = rest;
          return <Resource key={label} option={{ label }} {...others} />;
        }
        return <Resource key={label} option={{ label }} {...rest} />;
      })}
    </Admin>
  );
}
