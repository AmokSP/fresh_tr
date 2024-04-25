import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Taro from '@tarojs/taro';

import langCn from '@lang/cn';
import langHant from '@lang/hant';
import storage from '@utils/storage';

export const isHant = () => {
  const language = Taro.getSystemInfoSync().language;
  if (language.indexOf('zh') !== -1 && language !== 'zh_CN') {
    return true;
  }
  return false;
};

const defaultLanguage = isHant() ? 'hant' : 'cn';
if (!storage.getItem('language')) {
  storage.setItem('language', defaultLanguage);
}

const resources = {
  cn: {
    translation: langCn,
  },
  hant: {
    translation: langHant,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: storage.getItem('language'),
  fallbackLng: 'cn',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
