import { Admin, Resource } from "react-admin";
import entities from "../../entities/entities";
import simpleRestProvider from "ra-data-simple-rest";
import i18nProvider from "../../utils/translation/i18nProvider";
import MyLayout from "./MyLayout";
import config from "../../configs/config";

// import useAuthProvider from "../providers/auth.provider.hook";
// import dataProvider from "../providers/data.provider.hook";
const dataProvider = simpleRestProvider(config?.baseUrl);

// =======================================================

export default function MyAdmin() {
  return (
    <Admin layout={MyLayout} {...{ i18nProvider, dataProvider }}>
      {entities.map(({ label, ...reset }, index) => (
        <Resource key={index} option={{ label }} {...reset} />
      ))}
    </Admin>
  );
}
