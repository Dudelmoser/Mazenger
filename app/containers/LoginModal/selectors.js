import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectRoot} from "../App/selectors";
import {SESSION, EMAIL, PASSWORD, APP_STATE, VALID_EMAILS, THREAD_ID, USER_ID, IS_CONNECTED} from "./constants";

const selectSession = () => createSelector(
  selectRoot(),
  (root) => root.get(SESSION) || fromJS({})
);

const selectEmail = () => createSelector(
  selectSession(),
  (session) => session.get(EMAIL) || ""
);

const selectPassword = () => createSelector(
  selectSession(),
  (session) => session.get(PASSWORD) || ""
);

const selectAppState = () => createSelector(
  selectSession(),
  (session) => session.get(APP_STATE) || null
);

const selectValidEmails = () => createSelector(
  selectSession(),
  (session) => session.get(VALID_EMAILS) || fromJS([])
);

const selectMyUserID = () => createSelector(
  selectSession(),
  (session) => session.get(USER_ID) || 0
);

const selectCurrentThreadID = () => createSelector(
  selectSession(),
  (session) => session.get(THREAD_ID) || 0
);

const selectIsConnected = () => createSelector(
  selectSession(),
  (session) => session.get(IS_CONNECTED) || false
);

const selectIsLoggedIn = () => createSelector(
  selectAppState(),
  (appState) => appState ? true : false
);

export {
  selectSession,
  selectEmail,
  selectPassword,
  selectAppState,
  selectValidEmails,
  selectMyUserID,
  selectCurrentThreadID,
  selectIsConnected,
  selectIsLoggedIn,
}
