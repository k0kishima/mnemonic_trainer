import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, ja } from "$frontend/locales";

i18n
  .use(initReactI18next)
  .init({
    resources: { en, ja, },
    react: {
      useSuspense: false,
    },
    lng: 'ja',
    fallbackLng: 'ja',
    supportedLngs: ['en', 'ja'],
    lowerCaseLng: true,
    debug: false,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
