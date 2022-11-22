/**
 *  Configs
 * ----------------
 * 1 - cookies used for auth
 * 2 - cors
 *
 * @author justMario
 *
 */

// ---------------------------------------------------

/** Cookie configs
 * -------------------
 * secure: a boolean indicating
 * whether the cookie is only
 * to be sent over HTTPS
 *
 * max age in milliseconds = 24 * 60 * 60 * 1000 = 1day
 *
 * false by default for HTTP,
 * true by default for HTTPS
 * {@link https://github.com/expressjs/cookie-session}
 *
 */

export const cookiesConfigs = {
  maxAge: 24 * 60 * 60 * 100,
  keys: [process.env.COOKIE_KEY],
  // secure: true,
  name: "session",
};

// ---------------------------------------------------

/**
 *  Cors Configs
 *  ------------------
 * {@link https://github.com/expressjs/cors}
 */
export const corsConfigs = {
  // origin: process.env.CORS_ORIGIN,
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

// ---------------------------------------------------

/**
 * FCM service account
 * -------------------
 */
export const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};
