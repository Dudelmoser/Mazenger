import {THREAD_HISTORY_RECEIVED, UPDATE_RECEIVED} from "../App/actions/responses";
import {fromJS} from "immutable";
import {LOGOUT} from "../App/actions/requests";

const initState = fromJS({});

export default function (state = initState, action, curUserID, curThreadID) {
  switch (action.type) {
    case THREAD_HISTORY_RECEIVED:
      const threadID = action.args[0];
      return state
        .set(threadID, fromJS(action.data));

    case UPDATE_RECEIVED:
      const data = action.data;
      switch (data.type) {

        // never triggered ?
        case "read_receipt":
          return state.updateIn([data.threadID, -1, "readers"], readers => readers.push(data.reader));

        // not implemented yet
        case "presence":
          return state;

        case "message":
          const history = state.getIn([data.threadID]);
          const index = history ? history.count() : 0;
          return state
            .setIn([data.threadID, index], fromJS(data));
        default:
          return state;
      }

    case LOGOUT:
      return initState;
  }
}
