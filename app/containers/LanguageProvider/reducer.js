import {fromJS} from "immutable";
import {DEFAULT_LOCALE} from "./constants";
import {CHANGE_LOCALE} from "./actions";

const initialState = fromJS({
  locale: DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state
        .set("locale", action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;
