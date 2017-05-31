import {Map} from "immutable";
import {CHANGE_EMAIL, CHANGE_PASSWORD} from "./actions";
import {CLEAR_CACHE} from "../App/actions/actions";
import {LOGIN_FAILED, LOGIN_PASSED, THREAD_HISTORY_RECEIVED} from "../App/actions/responses";
import {LOGIN, LOGOUT} from "../App/actions/requests";
import {THREAD_ID, EMAIL, APP_STATE, USER_ID, LOGIN_STATE} from "./constants";

const initState = Map()
  .set(EMAIL, "")
  .set(APP_STATE, null)
  .set(USER_ID, null)
  .set(THREAD_ID, null)
  .set(LOGIN_STATE, 0);

/*
Login state explanation:
-1: wrong credentials
 0: logged out
 1: logged in
10: logging in..
*/

export default function (state = initState, action) {
  switch (action.type) {

    case CHANGE_EMAIL:
      return state
        .set(EMAIL, action.email)
        .set(LOGIN_STATE, 0);

    case CHANGE_PASSWORD:
      return state
        .set(LOGIN_STATE, 0);

    case LOGIN:
      return state
        .set(LOGIN_STATE, 10);

    case LOGIN_FAILED:
      return state
        .set(APP_STATE, null)
        .set(LOGIN_STATE, -1);

    case LOGIN_PASSED:
      return state
        .set(USER_ID, action.currentUserID)
        .set(APP_STATE, action.appState)
        .set(LOGIN_STATE, 1);

    case LOGOUT:
      return state
        .set(USER_ID, null)
        .set(THREAD_ID, null)
        .set(APP_STATE, null)
        .set(LOGIN_STATE, 0);

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
