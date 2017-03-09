import {selectRoot} from "../App/selectors";
import {selectMyUserID} from "../LoginModal/selectors";
import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {SETTINGS, CLEAR_CONFIRMED} from "./constants";

const selectSettings = () => createSelector(
  selectRoot(),
  (root) => root.get(SETTINGS) || fromJS({})
);

const selectMySettings = () => createSelector(
  selectSettings(),
  selectMyUserID(),
  (settings, userID) => settings.get(userID) || fromJS({})
);

export {
  selectSettings,
  selectMySettings,
}
