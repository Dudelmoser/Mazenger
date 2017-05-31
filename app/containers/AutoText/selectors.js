import {createSelector} from "reselect";
import {AUTOTEXT} from "./constants";
import {fromJS, List} from "immutable";
import {selectSession} from "../LoginModal/selectors";

export const selectAutoText = () => createSelector(
  selectSession(),
  (session) => session.get(AUTOTEXT) || fromJS({})
);

/* Put newer enries on top. */
export const selectReversedAutoText = () => createSelector(
  selectAutoText(),
  (autotext) => List(autotext.reverse())
);
