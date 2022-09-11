import config from "../../configs/config";

// =====================================================================

const authUrls = {
  login: config?.baseUrl + "/oauth/login",
  register: config?.baseUrl + "/oauth/register",
  me: config?.baseUrl + "/oauth/me",
};

// =====================================================================

const queryAuth = async (url, payload = {}, method = "POST", headers = {}) => {
  const body = method !== "GET" ? { body: JSON.stringify(payload) } : {};
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    ...body,
  };

  try {
    const rawResponse = await fetch(url, options);
    const data = await rawResponse.json();
    return data;
  } catch (e) {
    console.error(e.message);
    return e;
  }
};

// =====================================================================

export default function UseAuthProvider() {
  const authProvider = {
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    // send username and password to the auth server and get back credentials
    login: async ({ username: email, password }) => {
      const data = await queryAuth(authUrls.login, { email, password });
      if (data?.accessToken && data?.user?.id) {
        localStorage.setItem("user", JSON.stringify(data?.user));
        localStorage.setItem("accessToken", data?.accessToken);
        return Promise.resolve();
      }
      return Promise.reject();
    },

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    // when the dataProvider returns an error, check if this is an authentication error
    checkError: (error) => {
      console.error({ error });
      return Promise.resolve();
    },

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    // when the user navigates, make sure that their credentials are still valid
    checkAuth: async (params) => {
      const token = localStorage.getItem("accessToken");
      if (!token) return Promise.reject();
      const data = await queryAuth(authUrls.me, null, "GET", {
        Authorization: `Bearer ${token}`,
      });
      if (data?.accessToken && data?.user?.id) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    // remove local credentials and notify the auth server that the user logged out
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      return Promise.resolve();
    },

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    // get the user's profile
    getIdentity: async () => Promise.resolve(),

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    // get the user permissions (optional)
    getPermissions: () => Promise.resolve(),

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  };

  return authProvider;
}
