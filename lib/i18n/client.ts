import { createInstance, type i18n } from "i18next";
import { initReactI18next } from "react-i18next";
import type { Locale } from "./settings";
import en from "@/locales/en/translation.json";
import es from "@/locales/es/translation.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
};

export function createI18nInstance(locale: Locale): i18n {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    lng: locale,
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
  return instance;
}
