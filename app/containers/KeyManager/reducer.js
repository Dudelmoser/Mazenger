import {fromJS, Map, List} from "immutable";
import {SYMMETRIC_KEYS, PRIVATE_KEY, IS_ENCRYPTED} from "./constants";
import {SAVE_SYMMETRIC_KEY, SAVE_PRIVATE_KEY, SET_ENCRYPTED, IMPORT_KEYS} from "./actions";
import {CLEAR_USER_DATA} from "../PrivacyManager/actions";

const initState = fromJS({});

export default function (state = initState, action) {
  switch (action.type) {

    case SAVE_PRIVATE_KEY:
      return state
        .setIn([action.threadID, PRIVATE_KEY], action.key);

    case SAVE_SYMMETRIC_KEY:
      return state
        .updateIn([action.threadID, SYMMETRIC_KEYS], keys => {
          if (!keys)
            keys = List();
          return keys.push(action.key)
        });

    case SET_ENCRYPTED:
      return state
        .setIn([action.threadID, IS_ENCRYPTED], action.isEncrypted);

    /* Partly checks for invalid threadIDs or empty keys to avoid corrupting the state. */
    case IMPORT_KEYS:
      return state
        .withMutations(state => {
          fromJS(action.keys).forEach((keys, threadID) => {
            if (!(threadID && keys))
              return;
            if (!state.get(threadID))
              return state.set(threadID, new Map().set(SYMMETRIC_KEYS, keys));
            /* Convert the new and old key list to sets to avoid duplicates after merging. */
            state.updateIn([threadID, SYMMETRIC_KEYS], oldKeys => {
              return (oldKeys || List()).toSet().union(keys.toSet()).toList();
            });
          });
        });

    case CLEAR_USER_DATA:
      return initState;
  }
}
