import {selectSession} from "../LoginModal/selectors";
import {createSelector} from "reselect";
import {Map} from "immutable";
import {SETTINGS} from "./constants";

const selectSettings = () => createSelector(
  selectSession(),
  (session) => session.get(SETTINGS) || Map()
);

export {
  selectSettings,
}
