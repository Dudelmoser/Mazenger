import { createSelector } from "reselect";

export const selectLanguage = (state) => state.get("language");

export const selectLocale = () => createSelector(
  selectLanguage,
  (language) => language.get("locale")
);
