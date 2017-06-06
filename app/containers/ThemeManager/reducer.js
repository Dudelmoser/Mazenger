import {ACCENT_COLOR_KEY, BACKGROUND_COLOR_KEY} from "./constants";
import {CHANGE_ACCENT_COLOR, CHANGE_BACKGROUND_COLOR} from "./actions";
import {Map} from "immutable";

const initState = Map();
export default function (state = initState, action) {
  switch (action.type) {

    case CHANGE_ACCENT_COLOR:
      return state
        .set(ACCENT_COLOR_KEY, action.key);

    case CHANGE_BACKGROUND_COLOR:
      return state
        .set(BACKGROUND_COLOR_KEY, action.key);
  }
}
