import {fromJS, OrderedMap} from "immutable";
import {CLEAR_SETTINGS} from "../PrivacySettings/actions";
import {DELETE_ABBREVIATIONS, ADD_ABBREVIATION} from "./actions";

export const initState = OrderedMap({
  ";)": "😉",
  ":D": "😀",
  ":P": "😋",
  ":)": "🙂",
  ":(": "🙁",
  ":S": "😕",
  ":*": "😘",
  ":'(": "😢",
  ">:(": "😣",
  "o.O": "😮",
  "3:)": "😈",
  "O:)": "😇",
  "B-)": "😎 ",
  "<3": "❤",
  "(y)": "👍",
  ":poop:": "💩",
  ":turtle:": "🐢",
});

export default function (state = initState, action) {
  switch (action.type) {

    case DELETE_ABBREVIATIONS:
      const count = state.count();
      const selected = fromJS(action.keys);
      return state
        .withMutations(state => {
          state.keySeq().forEach((abbr, key) => {
            if (selected == "all" || selected.contains(count - 1 - key)) {
              state.delete(abbr)
            }
          });
        });

    case ADD_ABBREVIATION:
      if (!action.abbr || !action.full)
        return state;
      return state
          .set(action.abbr, action.full);

    case CLEAR_SETTINGS:
      return initState;

    default:
      return state;
  }
}
