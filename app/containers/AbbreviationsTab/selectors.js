import {createSelector} from "reselect";
import {ABBREVIATIONS} from "./constants";
import {fromJS, List} from "immutable";
import {selectSession} from "../LoginModal/selectors";

const selectAbbreviations = () => createSelector(
  selectSession(),
  (abbrs) => abbrs.get(ABBREVIATIONS) || fromJS({})
);

const selectAbbreviationsArray = () => createSelector(
  selectAbbreviations(),
  (abbrs) => List(abbrs.reverse())
);

export {
  selectAbbreviations,
  selectAbbreviationsArray,
}
