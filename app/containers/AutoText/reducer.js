import {fromJS, OrderedMap} from "immutable";
import {CLEAR_USER_DATA} from "../PrivacySettings/actions";
import {DELETE_ABBREVIATIONS, ADD_ABBREVIATION} from "./actions";

/* Some standard emoji abbreviations. */
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
  ":poop": "💩",
  ":turtle": "🐢",
});

export default function (state = initState, action) {
  switch (action.type) {

    /* action.keys is either an array of indices or "all" */
    case DELETE_ABBREVIATIONS:
      const count = state.count();
      const selected = fromJS(action.keys);
      return state
        .withMutations(state => {
          state.keySeq().forEach((abbr, key) => {
            if (selected === "all" || selected.contains(count - 1 - key)) {
              state.delete(abbr)
            }
          });
        });

    case ADD_ABBREVIATION:
      /* Prevent invalid autotext */
      if (!action.abbr || !action.full)
        return state;
      return state
          .set(action.abbr, action.full);

    case CLEAR_USER_DATA:
      return initState;

    default:
      return state;
  }
}
