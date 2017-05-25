import {createSelector} from "reselect";
import {selectSettings} from "../SettingsTab/selectors";
import {ACTIVE_TAB_LEFT} from "./constants";

const selectActiveTabLeft = () => createSelector(
  selectSettings(),
  (settings) => settings.get(ACTIVE_TAB_LEFT) || 0
);

export {
  selectActiveTabLeft,
}
