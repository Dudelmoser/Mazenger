import {Map} from "immutable";
import loginReducer from "../LoginModal/reducer";
import friendsReducer from "../FriendsList/reducer";
import {threadsReducer, usersReducer} from "../ThreadList/reducer";
import {historiesReducer, photosReducer, typersReducer} from "../ThreadHistory/reducer";
import inputsReducer from "../MessageInput/reducer";
import keysReducer from "../KeyManager/reducer";
import emojisReducer from "../EmojiList/reducer";
import memesReducer from "../MemeGenerator/reducer";
import autoreplyReducer from "../AutoResponder/reducer";
import autotextReducer from "../AutoText/reducer";
import themeReducer from "../ThemeManager/reducer";
import {LOGIN, USER_ID, THREAD_ID} from "../LoginModal/constants";
import {FRIENDS} from "../FriendsList/constants";
import {THREADS, USERS} from "../ThreadList/constants";
import {HISTORIES, PHOTOS, SHOW_PHOTO_VIEWER, TYPERS} from "../ThreadHistory/constants";
import {INPUTS} from "../MessageInput/constants";
import {KEYS} from "../KeyManager/constants";
import {EMOJIS} from "../EmojiList/constants";
import {MEMES} from "../MemeGenerator/constants";
import {AUTOREPLY} from "../AutoResponder/constants";
import {AUTOTEXT} from "../AutoText/constants";
import {THEME} from "../ThemeManager/constants";
import {SOCKET, SESSIONS, GUI} from "./constants";
import {CONNECTED, DISCONNECTED} from "./actions/actions";
import {combineReducers} from "redux-immutable";
import {CHANGE_LEFT_TAB} from "../Sidebars/actions";
import {CHANGE_RIGHT_TAB} from "../Sidebars/actions";
import {RIGHT_TAB} from "../Sidebars/constants";
import {LEFT_TAB} from "../Sidebars/constants";
import {CLOSE_PHOTO_VIEWER} from "../ThreadHistory/actions";
import {SET_CLEAR_DIALOG} from "../PrivacyManager/actions";
import {SHOW_CLEAR_DIALOG} from "../PrivacyManager/constants";
import {LOGOUT} from "./actions/requests";
import {PHOTO_URL_RESOLVED} from "./actions/responses";

/* Reducers concerned with data that exists for each user separately. */
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

/*
Merges all session reducers into one. Passes only the current user's data to the reducers.
The userID and threadID are also passed to reducers to allow contextual actions on the current thread
and to distinguish foreign from own messages.
*/
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

/* The socket.io connection state - not used yet. */
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

/* Manages which tabs or modals are visible.
Contains no private data and is therefore global. */
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

/* Combines session and global reducers into one big root reducer. */
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
