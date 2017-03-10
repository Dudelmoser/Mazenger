import {fromJS} from "immutable";
import combineReducers from "../../utils/combineReducers";
import sessionReducer from "../LoginModal/reducer";
import threadsReducer from "../ThreadList/reducer";
import friendsReducer from "../FriendsList/reducer";
import historiesReducer from "../ThreadHistory/reducer";
import usersReducer from "../ThreadList/usersReducer";
import typersReducer from "../ThreadHistory/typersReducer";
import inputsReducer from "../MessageInput/reducer";
import emojisReducer from "../EmojisTab/reducer";
import memesReducer from "../MemesTab/reducer";
import chatbotReducer from "../ChatbotTab/reducer";
import abbreviationsReducer from "../AbbreviationsTab/reducer";
import settingsReducer from "../SettingsTab/reducer";
import {SESSION} from "../LoginModal/constants";
import {FRIENDS} from "../FriendsList/constants";
import {THREADS, USERS} from "../ThreadList/constants";
import {HISTORIES, TYPERS} from "../ThreadHistory/constants";
import {INPUTS} from "../MessageInput/constants";
import {EMOJIS} from "../EmojisTab/constants";
import {MEMES} from "../MemesTab/constants";
import {CHATBOT} from "../ChatbotTab/constants";
import {ABBREVIATIONS} from "../AbbreviationsTab/constants";
import {SETTINGS} from "../SettingsTab/constants";

const initState = fromJS({
  session: {},

  // session
  friends: [],
  threads: {},
  histories: {},
  users: {},
  typers: {},
  inputs: {},

  // persistent
  emojis: {},
  memes: {},
  chatbot: {},
  abbreviations: {},
  settings: {},
});

export default function (state = initState, action) {
  const userID = state.getIn(["session", "userID"]);
  const threadID = state.getIn(["session", "threadID"]);

  // const map = {
  //   session: sessionReducer,
  //   friends: friendsReducer,
  //   threads: threadsReducer,
  //   histories: historiesReducer,
  //   users: usersReducer,
  //   typers: typersReducer,
  //   inputs: inputsReducer,
  //   emojis: emojisReducer,
  //   memes: memesReducer,
  //   chatbot: chatbotReducer,
  //   dictionary: abbreviationsReducer,
  //   settings: settingsReducer,
  // }

  let map = {};
  map[SESSION] = sessionReducer;
  map[FRIENDS] = friendsReducer;
  map[THREADS] = threadsReducer;
  map[HISTORIES] = historiesReducer;
  map[USERS] = usersReducer;
  map[TYPERS] = typersReducer;
  map[INPUTS] = inputsReducer;
  map[EMOJIS] = emojisReducer;
  map[MEMES] = memesReducer;
  map[CHATBOT] = chatbotReducer;
  map[ABBREVIATIONS] = abbreviationsReducer;
  map[SETTINGS] = settingsReducer;

  const rootReducer = combineReducers(map, [userID, threadID]);

  return rootReducer(state, action)
}
