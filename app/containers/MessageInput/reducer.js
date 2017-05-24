import {fromJS, Map, List} from "immutable";
import {MESSAGE_SENT} from "../App/actions/responses";
import {CHANGE_MESSAGE, SAVE_SYMMETRIC_KEY, SAVE_PRIVATE_KEY, SET_ENCRYPTED} from "./actions";
import {INSERT_EMOJI} from "../EmojisTab/actions";
import {SYMMETRIC_KEYS, PRIVATE_KEY, IS_ENCRYPTED} from "./constants";

const initState = fromJS({});

export function inputsReducer(state = initState, action, threadID) {
  switch (action.type) {

    case MESSAGE_SENT:
      return state
        .set(action.threadID, "");

    case CHANGE_MESSAGE:
      return state
        .set(threadID, action.message);

    case INSERT_EMOJI:
      if (!action.emoji)
        return state;

      let input = document.getElementById("input");
      let selectStart = input.selectionStart;
      let selectEnd = input.selectionEnd;

      input.focus();
      // must be delayed cause taking focus takes a short while and resets the selection
      setTimeout(() => {
        input.setSelectionRange(selectStart+2, selectEnd+2)
      }, 200);

      return state
        .update(threadID,
          message => message
            ? message.substring(0,selectStart) + action.emoji + message.substring(selectEnd)
            : action.emoji);
  }
}

export function keysReducer(state = Map(), action) {
  switch (action.type) {
    case SAVE_PRIVATE_KEY:
      return state
        .setIn([action.threadID, PRIVATE_KEY], action.key);
    case SAVE_SYMMETRIC_KEY:
      return state
        .updateIn([action.threadID, SYMMETRIC_KEYS], keys => {
          if (!keys)
            keys = List()
          return keys.push(action.key)
        });
    case SET_ENCRYPTED:
      return state
        .setIn([action.threadID, IS_ENCRYPTED], action.isEncrypted);
  }
}
