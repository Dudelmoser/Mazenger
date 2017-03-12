import {fromJS} from "immutable";
import {LOGOUT} from "../App/actions/requests";
import {THREAD_HISTORY_RECEIVED, UPDATE_RECEIVED} from "../App/actions/responses";

const initState = fromJS({});

function historiesReducer(state = initState, action) {
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

function typersReducer (state = initState, action) {
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

export {
  historiesReducer,
  typersReducer,
}
