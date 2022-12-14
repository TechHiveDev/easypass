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
const entitiesWithImages = [
  "compound",
  "oauth/register", // custom user
  "announcement/create", // custom announcement
  "user",
  "announcement",
];
const defaultDataProvider = simpleRestProvider(config?.baseUrl, httpClient);

const uploadImage = async ({ image, entity, id }) => {
  const token = localStorage.getItem("accessToken");
  const url = id ? `/api/upload/${entity}?id=${id}` : `/api/upload/${entity}`;
  const formData = new FormData();
  formData.append("file", image);
  const res = await fetch(config.baseUrl + url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.json();
};
export const dataProvider = {
  ...defaultDataProvider,
  create: async (resource, params) => {
    if (entitiesWithImages.includes(resource)) {
      const uploadTarget = resource === "compound" ? "logoUrl" : "photoUrl";
      if (!params?.data?.[uploadTarget]?.rawFile)
        return defaultDataProvider.create(resource, params);
      let entity = resource;
      if (resource === "oauth/register") entity = "user";
      if (resource === "announcement/create") entity = "announcement";
      const logoUrl = await uploadImage({
        image: params?.data?.[uploadTarget]?.rawFile,
        entity,
      });
      if (!logoUrl?.url)
        return Promise.reject("Error while uploading the image");
      const newParams = {
        ...params,
        data: {
          ...params.data,
          [uploadTarget]: logoUrl.url,
        },
      };
      return defaultDataProvider.create(resource, newParams);
    }
    return defaultDataProvider.create(resource, params);
  },
  update: async (resource, params) => {
    if (entitiesWithImages.includes(resource)) {
      let uploadTarget = resource === "compound" ? "logoUrl" : "photoUrl";
      if (!params?.data?.[uploadTarget]?.rawFile)
        return defaultDataProvider.update(resource, params);

      const logoUrl = await uploadImage({
        image: params?.data?.[uploadTarget]?.rawFile,
        entity: resource,
        id: +params?.id,
      });
      if (!logoUrl?.url)
        return Promise.reject("Error while uploading the image");
      const newParams = {
        ...params,
        data: {
          ...params.data,
          [uploadTarget]: logoUrl.url,
        },
      };
      return defaultDataProvider.update(resource, newParams);
    }
    return defaultDataProvider.update(resource, params);
  },
};
// =================================================================
export default function UseDataProvider() {
  return dataProvider;
}
