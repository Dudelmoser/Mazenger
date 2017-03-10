import {createSelector} from "reselect";
import {selectRoot} from "../App/selectors";
import {ABBREVIATIONS} from "./constants";
import {fromJS, List} from "immutable";
import {selectMyUserID} from "../LoginModal/selectors";
import {defaultAbbrs} from "./reducer";

const selectAbbreviations = () => createSelector(
  selectRoot(),
  (root) => root.get(ABBREVIATIONS) || fromJS({})
);

const selectMyAbbreviations = () => createSelector(
  selectAbbreviations(),
  selectMyUserID(),
  (abbrs, userID) => List(abbrs.get(userID) || defaultAbbrs)
);

export {
  selectAbbreviations,
  selectMyAbbreviations,
}
