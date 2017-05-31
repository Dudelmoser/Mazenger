import {createSelector} from "reselect";
import {LEFT_TAB} from "./constants";
import {selectGUI} from "../App/selectors";

export const selectActiveTabLeft = () => createSelector(
  selectGUI(),
  (gui) => gui.get(LEFT_TAB) || 0
);
