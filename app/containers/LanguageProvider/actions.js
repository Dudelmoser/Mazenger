export const CHANGE_LOCALE = "LanguageProvider.changeLocale";

export function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    locale
  };
}
