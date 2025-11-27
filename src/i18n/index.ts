import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en.json';
import zhTranslation from './zh.json';

// 配置i18n
const resources = {
  en: {
    translation: enTranslation
  },
  zh: {
    translation: zhTranslation
  }
};

i18n
  .use(initReactI18next) // 集成到React
  .init({
    resources,
    lng: 'en', // 默认语言
    fallbackLng: 'en', // 当指定语言不存在时的回退语言
    interpolation: {
      escapeValue: false // React已经处理了XSS，所以不需要再转义
    }
  });

export default i18n;