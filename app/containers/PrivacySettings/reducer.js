import {CLEAR_CONFIRMED} from "./constants";
import {CONFIRM_CLEAR_SETTINGS} from "../PrivacySettings/actions";

export default function (state, action) {
  switch (action.type) {

    case CONFIRM_CLEAR_SETTINGS:
      if (action.cancel)
        return state
          .set(CLEAR_CONFIRMED, true);
      return state
        .set(CLEAR_CONFIRMED, false);
  }
}
