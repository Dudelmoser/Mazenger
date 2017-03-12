import {ACCENT_COLOR, BACKGROUND_COLOR} from "./constants";
import {CHANGE_ACCENT_COLOR, CHANGE_BACKGROUND_COLOR} from "./actions";

export default function (state, action) {
  switch (action.type) {

    case CHANGE_ACCENT_COLOR:
      return state
        .set(ACCENT_COLOR, action.key);

    case CHANGE_BACKGROUND_COLOR:
      return state
        .set(BACKGROUND_COLOR, action.key);
  }
}
