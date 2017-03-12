import {selectSession} from "../LoginModal/selectors";
import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {SETTINGS, CLEAR_CONFIRMED} from "./constants";

const selectSettings = () => createSelector(
  selectSession(),
  (session) => session.get(SETTINGS) || fromJS({})
);

export {
  selectSettings,
}
