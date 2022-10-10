import config from "../configs/config";

const customFetch = async (url, options = {}) => {
  const { method = "GET", body = {} } = options;
  const token = localStorage.getItem("accessToken");
  const res = await fetch(
    config.baseUrl + url,
    method !== "GET"
      ? {
          method,
          body,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      : {
          method,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
  );
  return res.json();
};
export default customFetch;
