import {createSelector} from "reselect";
import {selectRoot} from "../App/selectors";
import {ABBREVIATIONS} from "./constants";
import {fromJS, List} from "immutable";
import {selectMyUserID} from "../LoginModal/selectors";

const selectAbbreviations = () => createSelector(
  selectRoot(),
  (root) => root.get(ABBREVIATIONS) || fromJS({})
);

const selectMyAbbreviations = () => createSelector(
  selectAbbreviations(),
  selectMyUserID(),
  (abbrs, userID) => abbrs.get(userID) || fromJS({})
);

const selectAbbreviationsArray = () => createSelector(
  selectMyAbbreviations(),
  (abbrs) => List(abbrs)
);

export {
  selectAbbreviations,
  selectMyAbbreviations,
  selectAbbreviationsArray,
}
