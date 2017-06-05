/*
This file will setup the i18n language files and locale data
*/
import {addLocaleData} from "react-intl";
import deLocaleData from "react-intl/locale-data/de";

import {DEFAULT_LOCALE} from "./containers/LanguageProvider/constants";
import deTranslationMessages from "./translations/de.json";

export const appLocales = [
  "de",
];

addLocaleData(deLocaleData);

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, deTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    let message = messages[key];
    if (!message && locale !== DEFAULT_LOCALE) {
      message = defaultFormattedMessages[key];
    }
    return Object.assign(formattedMessages, {[key]: message});
  }, {});
};

export const translationMessages = {
  de: formatTranslationMessages("en", deTranslationMessages),
};
