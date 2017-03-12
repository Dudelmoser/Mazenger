import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectCurrentThreadID, selectSession} from "../LoginModal/selectors";
import {INPUTS} from "./constants";

const selectInputs = () => createSelector(
  selectSession(),
  (session) => session.get(INPUTS) || fromJS({})
);

const selectCurrentInput = () => createSelector(
  selectInputs(),
  selectCurrentThreadID(),
  (inputs, threadID) => inputs.get(threadID) || ""
);

export {
  selectCurrentInput,
}
