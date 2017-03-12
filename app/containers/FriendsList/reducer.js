import {fromJS, List} from "immutable";
import {FRIENDS_LIST_RECEIVED} from "../App/actions/responses";

const initState = List();

export default function (state = initState, action) {
  switch (action.type) {

    case FRIENDS_LIST_RECEIVED:
      return fromJS(action.data)
  }
}
