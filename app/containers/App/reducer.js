import sessionReducer from "./reducers/sessionReducer";
import threadsReducer from "../ThreadList/reducer";
import emojisReducer from "../EmojiList/reducer";
import updateReducer from "./reducers/updateReducer";
import inputReducer from "../MessageInput/reducer";
import loginReducer from "../LoginModal/reducer";
import friendsReducer from "../FriendsList/reducer";
import memeReducer from "../MemeGenerator/reducer";

import {initialState} from "./state";
import {Map, fromJS} from "immutable";

function combinedReducer(state = initialState, action) {
  const reducers = [sessionReducer, updateReducer, loginReducer, threadsReducer, friendsReducer, inputReducer,
    emojisReducer, memeReducer];
  for (let reducer of reducers) {
    const newState = reducer(state, action);
    if (newState)
      return newState;
  }
  return state;
}

function combineReducers(reducers, params = []) {
  const keys = Object.keys(reducers);

  return (inputState = Map(), action) => inputState
      .withMutations((tempState) => {
        keys.forEach((key) => {
          const reducer = reducers[key];
          const curSubState = tempState.get(key);
          const nextSubState = reducer(curSubState, action, ...params);
          if (nextSubState)
            tempState.set(key, nextSubState);
        });
      });
}

const initState = fromJS({
  session: {
    email: "",
    password: "",
    appState: null,
    validEmails: [],
    userID: null,
    threadID: null,
    isConnected: false,
  },

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
  dictionary: {},
  settings: {},
});

function sliceReducer(state = initState, action) {
  const userID = state.getIn(["session", "userID"]);
  const threadID = state.getIn(["session", "threadID"]);

  const rootReducer = combineReducers({
    session: loginReducer,
    friends: friendsReducer,
    threads: threadsReducer,
    histories: historiesReducer,
    users: usersReducer,
    typers: typersReducer,
    inputs: inputReducer,
  }, [userID, threadID]);

  return rootReducer(state, action)
}

export default combinedReducer;
