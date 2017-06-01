import {fromJS, Map} from "immutable";
import {USER_INFO_RECEIVED} from "../App/actions/responses";
import {LOGOUT} from "../App/actions/requests";
import {MESSAGE_DECRYPTED, THREAD_INFO_DECRYPTED, THREAD_LIST_DECRYPTED} from "../KeyManager/actions";

function threadsReducer(state = Map(), action) {
  switch (action.type) {

    case THREAD_LIST_DECRYPTED:
      if (!action.data)
        return state;
      return Map().withMutations(map =>
        action.data.forEach((thread) => {
          map.set(thread.threadID, fromJS(thread))
        })
      );

    case THREAD_INFO_DECRYPTED:
      return state.update(action.id, thread => (thread || Map()).mergeDeep(fromJS(action.data)));

    case MESSAGE_DECRYPTED:
      const data = action.data;
      switch (data.type) {

        case "message":
          return state
            .setIn([data.threadID, "snippet"], data.body)
            .setIn([data.threadID, "timestamp"], data.timestamp);
        default:
          return state;
      }

    case LOGOUT:
      return Map();
  }
}

function usersReducer(state = Map(), action) {
  switch (action.type) {
    case USER_INFO_RECEIVED:
      const userID = Object.keys(action.data)[0];
      const userInfo = Object.values(action.data)[0];
      return state
        .set(userID, fromJS(userInfo));

    case LOGOUT:
      return Map();
  }
}

export {
  threadsReducer,
  usersReducer,
}
