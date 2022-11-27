const config = require("./src/Config/config");

module.exports = {
  scheme: "pyramid-heights",
  name: config.name,
  slug: config.slug,
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash-screen.png",
    resizeMode: "cover",
    // backgroundColor: "#ffffff",
  },
  plugins: [
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to upload profile photo.",
      },
    ],
    [
      "expo-notifications",
      {
        icon: "./assets/icon.png",
        color: "#0072BC",
      },
    ],
  ],
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.techhive.easypass",
    buildNumber: "1.0.0",
    supportsTablet: true,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  android: {
    googleServicesFile: "./google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.techhive.easypass",
    useNextNotificationsApi: true,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "f12e984b-6eea-4e43-95fd-6618101e7121",
    },
  },
};
