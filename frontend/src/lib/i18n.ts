import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ja } from "$frontend/locales/ja";

i18n
  .use(initReactI18next)
  .init({
    resources: { ja },
    react: {
      useSuspense: false,
    },
    lng: 'ja',
    fallbackLng: 'ja',
    supportedLngs: ['en', 'ja'],
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
