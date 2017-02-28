import {MESSAGE_SENT} from "../App/actions/responses";
import {CHANGE_MESSAGE} from "./actions";
import {THREADS, OUTBOX, CURRENT_THREAD} from "../App/state";

export default function (state, action) {
  const threadID = state.getIn([THREADS, CURRENT_THREAD]);
  switch (action.type) {

    case MESSAGE_SENT:
      return state
        .setIn([THREADS, action.threadID, OUTBOX], "");

    case CHANGE_MESSAGE:
      return state
        .setIn([THREADS, threadID, OUTBOX], action.message);
  }
}
