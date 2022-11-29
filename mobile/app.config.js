const config = require("./src/Config/config");

module.exports = {
  scheme: config.scheme,
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
    bundleIdentifier: config.package,
    buildNumber: "1.0.0",
    supportsTablet: true,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: config.package,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: config.easProjectId,
    },
  },
};
