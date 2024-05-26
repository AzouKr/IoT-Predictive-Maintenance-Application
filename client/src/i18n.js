import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/common.json";
import fr from "./locales/fr/common.json";
import ar from "./locales/ar/common.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
    ar: {
      translation: ar,
    },
  },
  lng: localStorage.getItem("lng") || "en",
});

export default i18next;
