import {fromJS} from "immutable";
import {UPDATE_RECEIVED} from "../actions/responses";
import {THREADS, THREAD_HISTORY, THREAD_INFO, TYPING, USERS, CURRENT_USER, USER_ID} from "../state";

export default function (state, action) {
  if (action.type == UPDATE_RECEIVED) {
    const data = action.data;
    switch (data.type) {

      case "typ":
        let threadID = data.threadID
        let myID = state.getIn([USERS, CURRENT_USER, USER_ID]);

        // threadID equals the clients ID in non-group-chats
        if (myID == data.threadID)
          threadID = data.from;
        if (data.isTyping) {
          return state.setIn([THREADS, threadID, TYPING, data.from], new Date().getTime());
        } else {
          return state.deleteIn([THREADS, threadID, TYPING, data.from]);
        }

      // api doesn't seem to trigger read_receipt
      case "read_receipt":
        return state.updateIn([THREADS, data.threadID, THREAD_HISTORY, -1, "readers"], readers => readers.push(data.reader));

      case "presence":
        return state;

      case "message":
        const history = state.getIn([THREADS, data.threadID, THREAD_HISTORY]);
        const index = history ? history.count() : 0;
        return state
          .setIn([THREADS, data.threadID, THREAD_HISTORY, index], fromJS(data))
          .setIn([THREADS, data.threadID, THREAD_INFO, "snippet"], data.body);
    }
  }
}