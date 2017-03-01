import sessionReducer from "./reducers/sessionReducer";
import threadsReducer from "../ThreadList/reducer";
import emojisReducer from "../EmojiList/reducer";
import updateReducer from "./reducers/updateReducer";
import inputReducer from "../MessageInput/reducer";
import loginReducer from "../LoginModal/reducer";
import friendsReducer from "../FriendsList/reducer";
import memeReducer from "../MemeGenerator/reducer";

import {initialState} from "./state";
import {fromJS} from "immutable";

function combineReducers(state = initialState, action) {
  const reducers = [sessionReducer, updateReducer, loginReducer, threadsReducer, friendsReducer, inputReducer,
    emojisReducer, memeReducer];
  for (let reducer of reducers) {
    const newState = reducer(state, action);
    if (newState)
      return newState;
  }
  return state;
}

function sliceReducer(state = fromJS({}), action) {
  const reducers = [sessionReducer, updateReducer, loginReducer, threadsReducer, friendsReducer, inputReducer,
    emojisReducer, memeReducer];
  for (let reducer of reducers) {
    const newState = reducer(state, action);
    if (newState)
      return newState;
  }
  return state;
}

export default combineReducers;
