import {fromJS} from "immutable";
import {INSERT_EMOJI, OPEN_EMOJI_GROUP} from "./actions";
import {FAVORITES, OPEN_GROUPS} from "./constants";
import {CLEAR_SETTINGS} from "../PrivacySettings/actions";

const initState = fromJS({});

export default function (state = initState, action, curUserID) {
  // doesn't work yet
  if (!state.get(curUserID))
    return state.setIn([curUserID, OPEN_GROUPS], fromJS({"0": true, "1": true}))
  switch (action.type) {

    case INSERT_EMOJI:
      if (!action.emoji)
        return state;
      return state
        .updateIn([curUserID, FAVORITES, action.emoji], count => count ? count + 1 : 1);

    case OPEN_EMOJI_GROUP:
      return state
        .updateIn([curUserID, OPEN_GROUPS, action.index], open => !open);

    case CLEAR_SETTINGS:
      return state
        .set(curUserID, initState);
  }
}
