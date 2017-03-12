import themeReducer from "../ThemeSettings/reducer";
import privacyReducer from "../PrivacySettings/reducer";
import {CLEAR_SETTINGS} from "../PrivacySettings/actions";
import {fromJS} from "immutable";

const initState = fromJS({});

export default function (state = initState, action) {
  if (action.type == CLEAR_SETTINGS)
    return initState;
  return state
    .merge(themeReducer(state, action))
    .merge(privacyReducer(state, action));
}
