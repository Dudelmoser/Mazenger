import {createSelector} from "reselect";
import {OUTBOX} from "../App/state";
import {selectCurrentThread} from "../App/selectors";

const selectCurrentMessage = () => createSelector(
  selectCurrentThread(),
  (thread) => thread ? thread.get(OUTBOX) : ""
);

export {
  selectCurrentMessage
}
