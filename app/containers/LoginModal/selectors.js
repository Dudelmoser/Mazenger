import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectRoot, selectSessions} from "../App/selectors";
import {LOGIN, EMAIL, PASSWORD, APP_STATE, VALID_EMAILS, THREAD_ID, USER_ID} from "./constants";

const selectSession = () => createSelector(
  selectSessions(),
  selectCurrentUserID(),
  (sessions, userID) => sessions.get(userID) || fromJS({})
);

const selectLogin = () => createSelector(
  selectRoot(),
  (root) => root.get(LOGIN) || fromJS({})
);

const selectEmail = () => createSelector(
  selectLogin(),
  (login) => login.get(EMAIL) || ""
);

const selectPassword = () => createSelector(
  selectLogin(),
  (login) => login.get(PASSWORD) || ""
);

const selectAppState = () => createSelector(
  selectLogin(),
  (login) => login.get(APP_STATE) || null
);

const selectValidEmails = () => createSelector(
  selectLogin(),
  (login) => login.get(VALID_EMAILS) || fromJS([])
);

const selectCurrentUserID = () => createSelector(
  selectLogin(),
  (login) => login.get(USER_ID) || 0
);

const selectCurrentThreadID = () => createSelector(
  selectLogin(),
  (login) => login.get(THREAD_ID) || 0
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
  selectCurrentUserID,
  selectCurrentThreadID,
  selectIsLoggedIn,
}
