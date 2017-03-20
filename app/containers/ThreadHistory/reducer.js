import {fromJS} from "immutable";
import {LOGOUT, DELETE_MESSAGE} from "../App/actions/requests";
import {THREAD_HISTORY_RECEIVED, UPDATE_RECEIVED} from "../App/actions/responses";
import {TOGGLE_MESSAGE_SELECT} from "../MessageFrame/actions";
import {IS_MSG_SELECT} from "./constants";
import {SELECT_ALL_MESSAGES, DESELECT_ALL_MESSAGES} from "./actions";

const initState = fromJS({});

function historiesReducer(state = initState, action, threadID) {
  switch (action.type) {
    case THREAD_HISTORY_RECEIVED:
      const thrID = action.args[0];
      return state
        .set(thrID, fromJS(action.data)
          .map(val => val.set(IS_MSG_SELECT, false)));

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
          const history = state.get(data.threadID);
          const index = history ? history.count() : 0;
          return state
            .setIn([data.threadID, index], fromJS(data).set(IS_MSG_SELECT, false));
        default:
          return state;
      }

    case TOGGLE_MESSAGE_SELECT:
      return state
        .updateIn([action.threadID, action.index, IS_MSG_SELECT], isSelect => !isSelect);

    case SELECT_ALL_MESSAGES:
      return state.withMutations(state => {
        const count = state.get(threadID).count();
        for (let i = 0; i < count; i++)
          state.setIn([threadID, i, IS_MSG_SELECT], true);
      });

    case DESELECT_ALL_MESSAGES:
      return state.withMutations(state => {
        const count = state.get(threadID).count();
        for (let i = 0; i < count; i++)
          state.setIn([threadID, i, IS_MSG_SELECT], false);
      });

    case DELETE_MESSAGE:
      return state
        .deleteIn([action.threadID, action.index]);

    case LOGOUT:
      return initState;
  }
}

function typersReducer (state = initState, action, threadID, userID) {
  switch (action.type) {
    case UPDATE_RECEIVED:
      const data = action.data;
      switch (data.type) {
        case "typ":
          let threadID = data.threadID;

          // threadID equals the clients ID in non-group-chats

          if (userID == data.threadID)
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
