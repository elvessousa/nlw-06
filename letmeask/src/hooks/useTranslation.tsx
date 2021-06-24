import { useContext } from 'react';

import { LanguageContext, defaultLocale } from '../contexts/LanguageContext';
import { LangStrings } from '../lib/Strings';

export default function useTranslation() {
  const { locale, setLocale } = useContext(LanguageContext);

  function t(key: string) {
    if (!LangStrings[locale][key]) {
      console.warn(`No string '${key}' for locale '${locale}'`);
    }

    return LangStrings[locale][key] || LangStrings[defaultLocale][key] || '';
  }

  return { t, locale, setLocale };
}
