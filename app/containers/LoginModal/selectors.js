import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectRoot, selectSessions} from "../App/selectors";
import {LOGIN, EMAIL, APP_STATE, THREAD_ID, USER_ID, LOGIN_STATE} from "./constants";

export const selectSession = () => createSelector(
  selectSessions(),
  selectCurrentUserID(),
  (sessions, userID) => sessions.get(userID) || fromJS({})
);

const selectLogin = () => createSelector(
  selectRoot(),
  (root) => root.get(LOGIN) || fromJS({})
);

export const selectEmail = () => createSelector(
  selectLogin(),
  (login) => login.get(EMAIL) || ""
);

export const selectAppState = () => createSelector(
  selectLogin(),
  (login) => login.get(APP_STATE) || null
);

export const selectCurrentUserID = () => createSelector(
  selectLogin(),
  (login) => login.get(USER_ID) || 0
);

export const selectCurrentThreadID = () => createSelector(
  selectLogin(),
  (login) => login.get(THREAD_ID) || 0
);

export const selectIsLoggedIn = () => createSelector(
  selectAppState(),
  (appState) => !!appState
);

export const selectLoginState = () => createSelector(
  selectLogin(),
  (login) => login.get(LOGIN_STATE)
);
