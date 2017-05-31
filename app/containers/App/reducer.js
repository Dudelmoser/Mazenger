import {Map} from "immutable";
import loginReducer from "../LoginModal/reducer";
import friendsReducer from "../FriendsList/reducer";
import {threadsReducer, usersReducer} from "../ThreadList/reducer";
import {historiesReducer, photosReducer, typersReducer} from "../ThreadHistory/reducer";
import inputsReducer from "../MessageInput/reducer";
import keysReducer from "../KeyList/reducer";
import emojisReducer from "../EmojiList/reducer";
import memesReducer from "../MemeGenerator/reducer";
import autoreplyReducer from "../AutoResponder/reducer";
import autotextReducer from "../AutoText/reducer";
import themeReducer from "../ThemeSettings/reducer";
import {LOGIN, USER_ID, THREAD_ID} from "../LoginModal/constants";
import {FRIENDS} from "../FriendsList/constants";
import {THREADS, USERS} from "../ThreadList/constants";
import {HISTORIES, PHOTOS, SHOW_PHOTO_VIEWER, TYPERS} from "../ThreadHistory/constants";
import {INPUTS} from "../MessageInput/constants";
import {KEYS} from "../KeyList/constants";
import {EMOJIS} from "../EmojiList/constants";
import {MEMES} from "../MemeGenerator/constants";
import {AUTOREPLY} from "../AutoResponder/constants";
import {AUTOTEXT} from "../AutoText/constants";
import {THEME} from "../ThemeSettings/constants";
import {SOCKET, SESSIONS, GUI} from "./constants";
import {CONNECTED, DISCONNECTED} from "./actions/actions";
import {combineReducers} from "redux-immutable";
import {CHANGE_LEFT_TAB} from "../SidebarLeft/actions";
import {CHANGE_RIGHT_TAB} from "../SidebarRight/actions";
import {RIGHT_TAB} from "../SidebarRight/constants";
import {LEFT_TAB} from "../SidebarLeft/constants";
import {CLOSE_PHOTO_VIEWER} from "../ThreadHistory/actions";
import {CLEAR_USER_DATA, SET_CLEAR_DIALOG} from "../PrivacySettings/actions";
import {SHOW_CLEAR_DIALOG} from "../PrivacySettings/constants";
import {LOGOUT} from "./actions/requests";
import {PHOTO_URL_RESOLVED} from "./actions/responses";

let sessionReducers = {};
sessionReducers[FRIENDS] = friendsReducer;
sessionReducers[THREADS] = threadsReducer;
sessionReducers[HISTORIES] = historiesReducer;
sessionReducers[USERS] = usersReducer;
sessionReducers[TYPERS] = typersReducer;
sessionReducers[INPUTS] = inputsReducer;
sessionReducers[KEYS] = keysReducer;
sessionReducers[EMOJIS] = emojisReducer;
sessionReducers[MEMES] = memesReducer;
sessionReducers[AUTOREPLY] = autoreplyReducer;
sessionReducers[AUTOTEXT] = autotextReducer;
sessionReducers[THEME] = themeReducer;
sessionReducers[PHOTOS] = photosReducer;

function mergeSessionReducers(reducers, userID, threadID) {
  const keys = Object.keys(reducers);

  return (state = Map(), action) => state
    .withMutations((tempState) => {
      if (!userID)
        return;
      keys.forEach((key) => {
        const reducer = reducers[key];
        const userState = tempState.get(userID) || Map();
        const curSubState = userState.get(key);
        const nextSubState = reducer(curSubState, action, threadID, userID);
        if (nextSubState)
          tempState.setIn([userID, key], nextSubState);
      });
    });
}

function socketReducer(state = false, action) {
  switch (action.type) {
    case CONNECTED:
      return true;

    case DISCONNECTED:
      return false;

    default:
      return state;
  }
}

const initGuiState = Map()
  .set(LEFT_TAB, 0)
  .set(RIGHT_TAB, 0)
  .set(SHOW_PHOTO_VIEWER, false)
  .set(SHOW_CLEAR_DIALOG, false);

function guiReducer(state = initGuiState, action) {
  switch (action.type) {
    case CHANGE_LEFT_TAB:
      return state
        .set(LEFT_TAB, action.value);

    case CHANGE_RIGHT_TAB:
      return state
        .set(RIGHT_TAB, action.value);

    case CLOSE_PHOTO_VIEWER:
      return state
        .set(SHOW_PHOTO_VIEWER, false);

    case PHOTO_URL_RESOLVED:
      return state
        .set(SHOW_PHOTO_VIEWER, true);

    case SET_CLEAR_DIALOG:
      if (action.visible)
        return state
          .set(SHOW_CLEAR_DIALOG, true);
      return state
        .set(SHOW_CLEAR_DIALOG, false);

    case LOGOUT:
      return initGuiState;

    default:
      return state;
  }
}

export default function (state = Map(), action) {
  const userID = state.getIn([LOGIN, USER_ID]);
  const threadID = state.getIn([LOGIN, THREAD_ID]);
  const sessionsReducer = mergeSessionReducers(sessionReducers, userID, threadID);

  const globalReducers = {};
  globalReducers[SOCKET] = socketReducer;
  globalReducers[LOGIN] = loginReducer;
  globalReducers[GUI] = guiReducer;
  globalReducers[SESSIONS] = sessionsReducer;

  const rootReducer = combineReducers(globalReducers);
  return rootReducer(state, action)
}
