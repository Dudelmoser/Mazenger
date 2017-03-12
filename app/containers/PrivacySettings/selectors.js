import {createSelector} from "reselect";
import {selectSettings} from "../SettingsTab/selectors";
import {CLEAR_CONFIRMED} from "./constants";

const selectClearConfirmed = () => createSelector(
  selectSettings(),
  (settings) => settings.get(CLEAR_CONFIRMED) || false
) ;

export {
  selectClearConfirmed,
}
