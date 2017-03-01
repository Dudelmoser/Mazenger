import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectRoot} from "../App/selectors";
import {selectMyThreadID} from "../LoginModal/selectors";
import {INPUTS} from "./constants";

const selectInputs = () => createSelector(
  selectRoot(),
  (root) => root.get(INPUTS) || fromJS({})
);

const selectCurrentInput = () => createSelector(
  selectInputs(),
  selectMyThreadID(),
  (inputs, threadID) => inputs.get(threadID) || ""
);

export {
  selectInputs,
  selectCurrentInput,
}
