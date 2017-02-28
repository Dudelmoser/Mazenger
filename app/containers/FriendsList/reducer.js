import {fromJS} from "immutable";
import {FRIENDS_LIST_RECEIVED} from "../App/actions/responses";
import {USERS, FRIENDS} from "../App/state";

export default function (state, action) {
  switch (action.type) {

    case FRIENDS_LIST_RECEIVED:
      return state
        .setIn([USERS, FRIENDS], fromJS(action.data));
  }
}
