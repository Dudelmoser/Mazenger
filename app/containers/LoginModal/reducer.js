import {CHANGE_EMAIL, CHANGE_PASSWORD} from "./actions";
import {USERS, CURRENT_USER, EMAIL, PASSWORD} from "../App/state";

export default function (state, action) {
  switch (action.type) {

    case CHANGE_EMAIL:
      return state
        .setIn([USERS, CURRENT_USER, EMAIL], action.email);

    case CHANGE_PASSWORD:
      return state
        .setIn([USERS, CURRENT_USER, PASSWORD], action.password);
  }
}
