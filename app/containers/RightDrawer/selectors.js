import {createSelector} from "reselect";
import {selectSettings} from "../SettingsTab/selectors";
import {ACTIVE_TAB_RIGHT} from "./constants";

const selectActiveTabRight = () => createSelector(
  selectSettings(),
  (settings) => settings.get(ACTIVE_TAB_RIGHT) || 0
);

export {
  selectActiveTabRight,
}
