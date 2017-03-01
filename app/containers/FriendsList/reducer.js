import {fromJS} from "immutable";
import {FRIENDS_LIST_RECEIVED} from "../App/actions/responses";

export default function (state, action) {
  switch (action.type) {

    case FRIENDS_LIST_RECEIVED:
      return fromJS(action.data)
  }
}
