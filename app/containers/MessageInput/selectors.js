import {createSelector} from "reselect";
import {Map} from "immutable";
import {selectCurrentThreadID, selectSession} from "../LoginModal/selectors";
import {INPUTS} from "./constants";

const selectInputs = () => createSelector(
  selectSession(),
  (session) => session.get(INPUTS) || Map()
);

export const selectCurrentInput = () => createSelector(
  selectInputs(),
  selectCurrentThreadID(),
  (inputs, threadID) => inputs.get(threadID) || ""
);
