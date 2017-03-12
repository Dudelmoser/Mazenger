import {Map} from "immutable";
import loginReducer from "../LoginModal/reducer";
import friendsReducer from "../FriendsList/reducer";
import {threadsReducer, usersReducer} from "../ThreadList/reducer";
import {historiesReducer, typersReducer} from "../ThreadHistory/reducer";
import inputsReducer from "../MessageInput/reducer";
import emojisReducer from "../EmojisTab/reducer";
import memesReducer from "../MemesTab/reducer";
import chatbotReducer from "../ChatbotTab/reducer";
import abbreviationsReducer from "../AbbreviationsTab/reducer";
import settingsReducer from "../SettingsTab/reducer";
import {LOGIN, USER_ID, THREAD_ID} from "../LoginModal/constants";
import {FRIENDS} from "../FriendsList/constants";
import {THREADS, USERS} from "../ThreadList/constants";
import {HISTORIES, TYPERS} from "../ThreadHistory/constants";
import {INPUTS} from "../MessageInput/constants";
import {EMOJIS} from "../EmojisTab/constants";
import {MEMES} from "../MemesTab/constants";
import {CHATBOT} from "../ChatbotTab/constants";
import {ABBREVIATIONS} from "../AbbreviationsTab/constants";
import {SETTINGS} from "../SettingsTab/constants";
import {SOCKET, SESSIONS} from "./constants";
import {CONNECTED, DISCONNECTED} from "./actions/actions";
import {combineReducers} from "redux-immutable";

let reducers = {};
reducers[FRIENDS] = friendsReducer;
reducers[THREADS] = threadsReducer;
reducers[HISTORIES] = historiesReducer;
reducers[USERS] = usersReducer;
reducers[TYPERS] = typersReducer;
reducers[INPUTS] = inputsReducer;
reducers[EMOJIS] = emojisReducer;
reducers[MEMES] = memesReducer;
reducers[CHATBOT] = chatbotReducer;
reducers[ABBREVIATIONS] = abbreviationsReducer;
reducers[SETTINGS] = settingsReducer;

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
        const nextSubState = reducer(curSubState, action, threadID);
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

export default function (state = Map(), action) {
  const userID = state.getIn([LOGIN, USER_ID]);
  const threadID = state.getIn([LOGIN, THREAD_ID]);
  const sessionsReducer = mergeSessionReducers(reducers, userID, threadID);

  const topLevelReducers = {};
  topLevelReducers[SOCKET] = socketReducer;
  topLevelReducers[LOGIN] = loginReducer;
  topLevelReducers[SESSIONS] = sessionsReducer;

  const rootReducer = combineReducers(topLevelReducers);
  return rootReducer(state, action)
}
