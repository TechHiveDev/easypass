import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";
import config from "../../configs/config";

// =================================================================

export default function UseDataProvider() {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const httpClient = (url, options = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }

    // options.headers.set('X-Custom-Header', 'foobar');
    const token = localStorage.getItem("accessToken");
    if (token) options.headers.set("Authorization", "Bearer " + token);

    return fetchUtils.fetchJson(url, options);
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const dataProvider = simpleRestProvider(config?.baseUrl, httpClient);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return dataProvider;
}
// =================================================================
