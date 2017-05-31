import {fromJS, Map} from "immutable";
import {INSERT_EMOJI, OPEN_EMOJI_GROUP} from "./actions";
import {FAVORITES, OPEN_GROUPS} from "./constants";
import {CLEAR_USER_DATA} from "../PrivacySettings/actions";

const initState = Map()
  .set(OPEN_GROUPS, fromJS([true, true]));

export default function (state = initState, action) {
  switch (action.type) {

    case INSERT_EMOJI:
      if (!action.emoji)
        return state;
      /* Increase emoji counter. */
      return state
        .updateIn([FAVORITES, action.emoji], count => count ? count + 1 : 1);

    case OPEN_EMOJI_GROUP:
      return state
        .updateIn([OPEN_GROUPS, action.index], open => !open);

    case CLEAR_USER_DATA:
      return initState;

    default:
      return state;
  }
}
