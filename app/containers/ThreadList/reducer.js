import {fromJS} from "immutable";
import {THREAD_LIST_RECEIVED, THREAD_INFO_RECEIVED, UPDATE_RECEIVED, USER_INFO_RECEIVED} from "../App/actions/responses";
import {LOGOUT} from "../App/actions/requests";

const initState = fromJS({});

function threadsReducer(state = initState, action) {
  switch (action.type) {

    case THREAD_LIST_RECEIVED:
      if (!action.data)
        return state;
      return fromJS({}).withMutations(map =>
        action.data.forEach((element) => {
          map.set(element.threadID, fromJS(element))
        })
      );

    case THREAD_INFO_RECEIVED:
      return state.update(action.id, thread => thread.mergeDeep(fromJS(action.data)));

    case UPDATE_RECEIVED:
      const data = action.data;
      switch (data.type) {

        case "message":
          return state
            .setIn([data.threadID, "snippet"], data.body);
        default:
          return state;
      }

    case LOGOUT:
      return initState;
  }
}

function usersReducer(state = initState, action) {
  switch (action.type) {
    case USER_INFO_RECEIVED:
      const userID = Object.keys(action.data)[0];
      const userInfo = Object.values(action.data)[0];
      return state
        .set(userID, fromJS(userInfo));

    case LOGOUT:
      return initState;
  }
}

export {
  threadsReducer,
  usersReducer,
}
