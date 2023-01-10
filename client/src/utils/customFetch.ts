import config from "../configs/config";

const customFetch = async (url: string, options = {}) => {
  const { method = "GET", body = {} }: any = options;

  if (!["GET", "POST", "PUT", "DELETE"].includes(method)) {
    console.error("http verbs can only be GET or POST or PUT or DELETE");
  }
  const token = localStorage.getItem("accessToken");
  const res = await fetch(
    config.baseUrl + url,
    method !== "GET"
      ? {
          method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
  );
  return res.json();
};
export default customFetch;
