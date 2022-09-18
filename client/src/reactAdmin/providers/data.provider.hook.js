import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";
import config from "../../configs/config";

// =================================================================
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("accessToken");
  if (token) options.headers.set("Authorization", "Bearer " + token);

  return fetchUtils.fetchJson(url, options);
};
// =================================================================
export const dataProvider = simpleRestProvider(config?.baseUrl, httpClient);
// =================================================================
export default function UseDataProvider() {
  return dataProvider;
}
