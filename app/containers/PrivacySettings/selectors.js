import {createSelector} from "reselect";
import {selectMySettings} from "../SettingsTab/selectors";
import {CLEAR_CONFIRMED} from "./constants";

const selectClearConfirmed = () => createSelector(
  selectMySettings(),
  (settings) => settings.get(CLEAR_CONFIRMED) || false
) ;

export {
  selectClearConfirmed,
}
