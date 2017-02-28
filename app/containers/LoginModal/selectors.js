import {createSelector} from "reselect";
import {selectCurrentUser} from "../App/selectors";
import {EMAIL, PASSWORD, APP_STATE} from "../App/state";

const selectEmail = () => createSelector(
  selectCurrentUser(),
  (user) => user ? user.get(EMAIL) : ""
);

const selectPassword = () => createSelector(
  selectCurrentUser(),
  (user) => user ? user.get(PASSWORD) : ""
);

const selectAppState = () => createSelector(
  selectCurrentUser(),
  (user) => user ? user.get(APP_STATE) : ""
);

const selectLoggedIn = () => createSelector(
  selectCurrentUser(),
  (user) => user ? (user.get(APP_STATE) ? true : false) : false
);

export {
  selectEmail,
  selectPassword,
  selectAppState,
  selectLoggedIn
}
