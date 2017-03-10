import {fromJS, OrderedMap} from "immutable";
import {CLEAR_SETTINGS} from "../PrivacySettings/actions";
import {DELETE_ABBREVIATIONS, ADD_ABBREVIATION} from "./actions";

const initState = fromJS({});

export const defaultAbbrs = OrderedMap({
  ":D": "😀",
  "bubub": "🐢",
});

export default function (state = initState, action, curUserID) {
  switch (action.type) {

    case CLEAR_SETTINGS:
      return state
        .set(curUserID, initState);

    case DELETE_ABBREVIATIONS:
      const selected = fromJS(action.keys);
      return state
        .withMutations(state => {
          state.get(curUserID).keySeq().forEach((abbr, key) => {
            if (selected.contains(key)) {
              state.deleteIn([curUserID, abbr])
            }
          });
        });

    case ADD_ABBREVIATION:
      if (!action.abbr || !action.full)
        return state;
      if (!state.get(curUserID))
        return state
          .set(curUserID, defaultAbbrs)
          .setIn([curUserID, action.abbr], action.full);
      return state
        .setIn([curUserID, action.abbr], action.full)
  }
}
