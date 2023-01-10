import config from "../../configs/config";

// =====================================================================

const authUrls = {
  login: config?.baseUrl + "/oauth/login",
  register: config?.baseUrl + "/oauth/register",
  me: config?.baseUrl + "/oauth/me",
};

// =====================================================================

export const queryAuth = async (
  url: string,
  payload = {},
  method = "POST",
  headers = {}
) => {
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
  } catch (e: any) {
    console.error(e.message);
    return e;
  }
};

// =====================================================================
const event = new Event("login");

export const authProvider = {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  // send username and password to the auth server and get back credentials
  login: async ({ username: email, password }: any) => {
    const data = await queryAuth(authUrls.login, { email, password });

    const { accessToken, user }: any = data;
    const { type, id }: any = user;

    if (accessToken && id) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);

      if (!["Admin", "SuperAdmin"].includes(type)) {
        alert("You're not admin");
        return Promise.reject();
      }

      window.dispatchEvent(event);
      return Promise.resolve();
    }
    return Promise.reject();
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  // when the dataProvider returns an error, check if this is an authentication error
  checkError: (error: any) => {
    console.error({ error });
    return Promise.resolve();
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  // when the user navigates, make sure that their credentials are still valid
  checkAuth: async (_params: any) => {
    const token = localStorage.getItem("accessToken");

    if (!token) return Promise.reject();

    const data = await queryAuth(authUrls.me, {}, "GET", {
      Authorization: `Bearer ${token}`,
    });

    if (token && data?.id) return Promise.resolve();

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
  getIdentity: async () => {
    const user = localStorage.getItem("user");
    return user ? Promise.resolve(JSON.parse(user)) : Promise.reject();
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  // get the user permissions (optional)
  getPermissions: () => {
    const user = localStorage.getItem("user");
    return user ? Promise.resolve(JSON.parse(user).type) : Promise.reject();
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
};
export default function UseAuthProvider() {
  return authProvider;
}
