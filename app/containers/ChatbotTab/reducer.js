import {fromJS, Map, OrderedMap} from "immutable";
import {CLEAR_SETTINGS} from "../PrivacySettings/actions";
import {ADD_REGEX, DELETE_REGEX, SET_BOT_STATE} from "./actions";
import {GLOBAL, DICT, ENABLED} from "./constants";

export const initState = Map()
  .setIn([GLOBAL, DICT], OrderedMap({
    "[\s\S]?": "An employee will soon answer your question. Thank you for your patience!",
    "(shipping|delivery)": "The shipping fee is 2,95$",
    "(birthday|wish|best)": "Thank you :)",
  })).setIn([GLOBAL, ENABLED], false);

export default function (state = initState, action, threadID) {
  switch (action.type) {

    case DELETE_REGEX:
      const selected = fromJS(action.keys);
      return state
        .withMutations(state => {
          const dict = state.getIn([action.global ? GLOBAL : threadID, DICT]).keySeq();
          const count = dict.count();
          dict.forEach((value, key) => {
            if (selected == "all" || selected.contains(count - 1 - key)) {
              state.deleteIn([action.global ? GLOBAL : threadID, DICT, value]);
            }
          });
        });

    case ADD_REGEX:
      console.log(action);
      if (!action.regex || !action.res)
        return state;
      return state
        .setIn([action.global ? GLOBAL : threadID, DICT, action.regex], action.res);

    case SET_BOT_STATE:
      return state
        .setIn([action.global ? GLOBAL : threadID, ENABLED], action.enabled);

    case CLEAR_SETTINGS:
      return initState;

    default:
      return state;
  }
}
