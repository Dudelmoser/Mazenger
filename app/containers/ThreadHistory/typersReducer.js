import {fromJS} from "immutable";
import {UPDATE_RECEIVED, THREAD_HISTORY_RECEIVED} from "../App/actions/responses";
import {LOGOUT} from "../App/actions/requests";

const initState = fromJS({});

export default function (state = initState, action, curUserID, curThreadID) {
  switch (action.type) {
    case UPDATE_RECEIVED:
      const data = action.data;
      switch (data.type) {
        case "typ":
          let threadID = data.threadID;

          // threadID equals the clients ID in non-group-chats
          if (curUserID == data.threadID)
            threadID = data.from;
          if (data.isTyping)
            return state.setIn([threadID, data.from], new Date().getTime());
          return state.deleteIn([threadID, data.from]);
        default:
          return state;
      }

    case THREAD_HISTORY_RECEIVED:
      const threadID = action.args[0];
      return state
        .set(threadID, fromJS({}));

    case LOGOUT:
      return initState;
  }
}
