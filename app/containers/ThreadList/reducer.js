import {fromJS} from "immutable";

import {THREAD_LIST_RECEIVED, THREAD_INFO_RECEIVED, USER_INFO_RECEIVED, THREAD_HISTORY_RECEIVED} from "../App/actions/responses";
import {THREADS, THREAD_INFO, USERS, CURRENT_THREAD, THREAD_HISTORY, TYPING} from "../App/state";

export default function (state, action) {
  switch (action.type) {

    case THREAD_LIST_RECEIVED:
      const threadList = action.args[2];
      return state
        .setIn([THREADS, threadList], fromJS(action.data));

    case THREAD_INFO_RECEIVED:
      return state
        .setIn([THREADS, action.id, THREAD_INFO], fromJS(action.data));

    case USER_INFO_RECEIVED:
      const userID = Object.keys(action.data)[0];
      const userInfo = Object.values(action.data)[0];
      return state
        .setIn([USERS, userID], fromJS(userInfo));

    case THREAD_HISTORY_RECEIVED:
      const threadID = action.args[0];
      return state
        .setIn([THREADS, CURRENT_THREAD], threadID)
        .setIn([THREADS, threadID, THREAD_HISTORY], fromJS(action.data))
        .setIn([THREADS, threadID, TYPING], fromJS({}));
  }
}
