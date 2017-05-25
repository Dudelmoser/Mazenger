import themeReducer from "../ThemeSettings/reducer";
import privacyReducer from "../PrivacySettings/reducer";
import {CLEAR_SETTINGS} from "../PrivacySettings/actions";
import {fromJS} from "immutable";
import {CHANGE_RIGHT_TAB} from "../RightDrawer/actions";
import {ACTIVE_TAB_RIGHT} from "../RightDrawer/constants";
import {ACTIVE_TAB_LEFT} from "../LeftDrawer/constants";
import {CHANGE_LEFT_TAB} from "../LeftDrawer/actions";

const initState = fromJS({});

export default function (state = initState, action) {
  switch (action.type) {

    case CLEAR_SETTINGS:
      return initState;

    case CHANGE_LEFT_TAB:
      return state
        .set(ACTIVE_TAB_LEFT, action.value);

    case CHANGE_RIGHT_TAB:
      return state
        .set(ACTIVE_TAB_RIGHT, action.value);
  }
  if (action.type == CLEAR_SETTINGS)
    return initState;
  return state
    .merge(themeReducer(state, action))
    .merge(privacyReducer(state, action));
}
