import {fromJS} from "immutable";
import {initialState} from "../state";
import {LOGOUT} from "../actions/requests";
import {LOGIN_FAILED, LOGIN_PASSED} from "../actions/responses";
import {CONNECTED, DISCONNECTED, CLEAR_CACHE} from "../actions/actions"
import {USERS, CURRENT_USER, IS_CONNECTED, APP_STATE, USER_ID} from "../state";

export default function(state, action) {
  switch (action.type) {

    case CONNECTED:
      return state
        .setIn([USERS, CURRENT_USER, IS_CONNECTED], true);

    case DISCONNECTED:
      return state
        .setIn([USERS, CURRENT_USER, IS_CONNECTED], false);

    case LOGIN_FAILED:
      return state
        .setIn([USERS, CURRENT_USER, APP_STATE], null);

    case LOGIN_PASSED:
      let newState = state;

      let oldID = state.getIn([USERS, CURRENT_USER, USER_ID]);
      let newID = action.currentUserID;
      if (oldID != newID)
        newState = initialState;

      return state
        .setIn([USERS, CURRENT_USER, USER_ID], action.currentUserID)
        .setIn([USERS, CURRENT_USER, APP_STATE], fromJS(action.appState));

    case LOGOUT:
      return state
        .setIn([USERS, CURRENT_USER, APP_STATE], null);

    case CLEAR_CACHE:
      return initialState;
  }
}