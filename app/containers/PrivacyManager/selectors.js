import {createSelector} from "reselect";
import {SHOW_CLEAR_DIALOG} from "./constants";
import {selectGUI} from "../App/selectors";

export const selectShowClearDialog = () => createSelector(
  selectGUI(),
  (gui) => gui.get(SHOW_CLEAR_DIALOG) || false
);
