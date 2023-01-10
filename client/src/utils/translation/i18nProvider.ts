import polyglotI18nProvider from "ra-i18n-polyglot";
import arabicMessages from "./arabicMessages";
import allEnglishMessages from "./englishMessages";

// ------------------------------------------------

const i18nProvider = polyglotI18nProvider(
  (locale) => (locale === "ar" ? arabicMessages : allEnglishMessages),
  "en" // Default locale
);

// ------------------------------------------------

export default i18nProvider;
