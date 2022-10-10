import { Admin, Resource, usePermissions, CustomRoutes } from "react-admin";
import entities from "../../entities/entities";
import i18nProvider from "../../utils/translation/i18nProvider";
import { authProvider } from "../providers/auth.provider.hook";
import { dataProvider } from "../providers/data.provider.hook";
import MyLayout from "./MyLayout";
import SignUp from "../../custom-views/Signup";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Scan from "../../custom-views/Reports/Scan";
import Invite from "../../custom-views/Reports/Invite";
// =======================================================
export default function MyAdmin() {
  const [type, setType] = useState(
    JSON.parse(localStorage.getItem("user"))?.type || "Admin"
  );
  useEffect(() => {
    window.addEventListener("login", () => {
      setType(JSON.parse(localStorage.getItem("user"))?.type || "Admin");
    });
  }, []);
  return (
    <Admin
      layout={MyLayout}
      {...{ i18nProvider, dataProvider, authProvider }}
      loginPage={<SignUp />}
    >
      {entities.map(({ label, ...rest }) => {
        if (label === "User" && !["Admin", "SuperAdmin"].includes(type)) {
          const { create, ...others } = rest;
          return <Resource key={label} option={{ label }} {...others} />;
        }
        if (label === "Compound" && type !== "SuperAdmin") {
          const { show, list, name } = rest;
          return (
            <Resource
              key={label}
              option={{ label }}
              show={show}
              list={list}
              name={name}
            />
          );
        }
        return <Resource key={label} option={{ label }} {...rest} />;
      })}
      <CustomRoutes>
        <Route path="/reports/scan" element={<Scan />} />
        <Route path="/reports/invite" element={<Invite />} />
      </CustomRoutes>
    </Admin>
  );
}
