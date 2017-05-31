import {createSelector} from "reselect";
import {RIGHT_TAB} from "./constants";
import {selectGUI} from "../App/selectors";

export const selectActiveTabRight = () => createSelector(
  selectGUI(),
  (gui) => gui.get(RIGHT_TAB) || 0
);
