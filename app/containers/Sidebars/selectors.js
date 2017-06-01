import {createSelector} from "reselect";
import {LEFT_TAB, RIGHT_TAB} from "./constants";
import {selectGUI} from "../App/selectors";

export const selectActiveTabLeft = () => createSelector(
  selectGUI(),
  (gui) => gui.get(LEFT_TAB) || 0
);

export const selectActiveTabRight = () => createSelector(
  selectGUI(),
  (gui) => gui.get(RIGHT_TAB) || 0
);
