import {CLEAR_CONFIRMED} from "./constants";
import {CONFIRM_CLEAR_SETTINGS} from "../PrivacySettings/actions";

export default function (state, action, curUserID) {
  switch (action.type) {

    case CONFIRM_CLEAR_SETTINGS:
      if (action.cancel)
        return state
          .setIn([curUserID, CLEAR_CONFIRMED], true);
      return state
        .setIn([curUserID, CLEAR_CONFIRMED], false);
  }
}
