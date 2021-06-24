import useTranslation from '../hooks/useTranslation';

export function LanguageSelector() {
  const { locale, setLocale } = useTranslation();
  const otherLocale = locale === 'en' ? 'pt' : 'en';

  function handleLocaleChange() {
    localStorage.setItem('lang', otherLocale);
    setLocale(otherLocale);
  }

  return (
    <button className="lang-selector" onClick={handleLocaleChange}>
      {locale}
    </button>
  );
}
