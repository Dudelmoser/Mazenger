import themeReducer from "../ColorPicker/reducer";
import privacyReducer from "../PrivacySettings/reducer";
import {CLEAR_SETTINGS} from "../PrivacySettings/actions";
import {fromJS} from "immutable";

const initState = fromJS({});

export default function (state = initState, action, curUserID) {
  if (action.type == CLEAR_SETTINGS)
    return state
      .set(curUserID, initState);
  return state
    .merge(themeReducer(state, action, curUserID))
    .merge(privacyReducer(state, action, curUserID));
}
