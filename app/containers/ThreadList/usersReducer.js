import {fromJS} from "immutable";
import {USER_INFO_RECEIVED} from "../App/actions/responses";
import {LOGOUT} from "../App/actions/requests";

const initState = fromJS({})

export default function (state = initState, action, curUserID, curThreadID) {
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
