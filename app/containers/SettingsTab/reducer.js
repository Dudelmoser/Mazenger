import themeReducer from "../ThemeSettings/reducer";
import privacyReducer from "../PrivacySettings/reducer";
import {CLEAR_SETTINGS} from "../PrivacySettings/actions";
import {fromJS} from "immutable";
import {CHANGE_RIGHT_TAB} from "../RightDrawer/actions";
import {ACTIVE_TAB_RIGHT} from "../RightDrawer/constants";
import {ACTIVE_TAB_LEFT} from "../LeftDrawer/constants";
import {CHANGE_LEFT_TAB} from "../LeftDrawer/actions";
import {PHOTO_URL_RESOLVED, THREAD_PICTURES_RECEIVED} from "../App/actions/responses";
import {IS_PHOTO_VISIBLE, PHOTO_URLS} from "./constants";
import {CLOSE_PHOTO} from "../App/actions/actions";

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

    case PHOTO_URL_RESOLVED:
      return state
        .update(PHOTO_URLS, urls => fromJS([action.url]).concat(urls))
        .set(IS_PHOTO_VISIBLE, true);

    case CLOSE_PHOTO:
      return state
        .set(IS_PHOTO_VISIBLE, false);

    case THREAD_PICTURES_RECEIVED:
      return state
        .set(PHOTO_URLS, fromJS(action.photos).map(photo => photo.get("uri")))

  }
  return state
    .merge(themeReducer(state, action))
    .merge(privacyReducer(state, action));
}
