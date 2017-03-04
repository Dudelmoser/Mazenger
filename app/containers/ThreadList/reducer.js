import {fromJS} from "immutable";
import {THREAD_LIST_RECEIVED, THREAD_INFO_RECEIVED, UPDATE_RECEIVED} from "../App/actions/responses";
import {LOGOUT} from "../App/actions/requests";

const initState = fromJS({});

export default function (state = initState, action, curUserID, curThreadID) {
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
      //return state.set(action.id, fromJS(action.data));     // better merge!
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
