import {ACCENT_COLOR, BACKGROUND_COLOR} from "./constants";
import {CHANGE_ACCENT_COLOR, CHANGE_BACKGROUND_COLOR} from "./actions";

export default function (state, action, curUserID) {
  switch (action.type) {

    case CHANGE_ACCENT_COLOR:
      return state
        .setIn([curUserID, ACCENT_COLOR], action.key);

    case CHANGE_BACKGROUND_COLOR:
      return state
        .setIn([curUserID, BACKGROUND_COLOR], action.key);
  }
}
