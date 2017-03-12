import {fromJS} from "immutable";
import {CHANGE_EMAIL, CHANGE_PASSWORD} from "./actions";
import {CLEAR_CACHE} from "../App/actions/actions";
import {LOGIN_FAILED, LOGIN_PASSED, THREAD_HISTORY_RECEIVED} from "../App/actions/responses";
import {LOGOUT} from "../App/actions/requests";
import {THREAD_ID, EMAIL, PASSWORD, APP_STATE, USER_ID, VALID_EMAILS} from "./constants";

let initState = fromJS({
  email: "",
  password: "",
  appState: null,
  validEmails: [],
  userID: null,
  threadID: null,
});

export default function (state = initState, action) {
  switch (action.type) {

    case CHANGE_EMAIL:
      return state
        .set(EMAIL, action.email);

    case CHANGE_PASSWORD:
      return state
        .set(PASSWORD, action.password);

    case LOGIN_FAILED:
      return state
        .set(APP_STATE, null);

    case LOGIN_PASSED:
      let newState = state;

      let newID = action.currentUserID;
      let curID = state.get(USER_ID);
      if (curID != newID)
        newState = initState;

      return newState
        .set(USER_ID, newID)
        .set(APP_STATE, action.appState)
        .update(VALID_EMAILS, arr => {
          if (arr.includes(state.get(EMAIL)))
            return arr;
          return arr.push(state.get(EMAIL))})
        .set(PASSWORD, "");

    case LOGOUT:
      return state
        .set(APP_STATE, null)
        .set(USER_ID, 0)
        .set(THREAD_ID, null);

    case CLEAR_CACHE:
      return initState;

    case THREAD_HISTORY_RECEIVED:
      const threadID = action.args[0];
      return state
        .set(THREAD_ID, threadID);

    default:
      return state;
  }
}
