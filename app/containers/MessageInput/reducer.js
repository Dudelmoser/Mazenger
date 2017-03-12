import {fromJS} from "immutable";
import {MESSAGE_SENT} from "../App/actions/responses";
import {CHANGE_MESSAGE} from "./actions";
import {INSERT_EMOJI} from "../EmojisTab/actions";

const initState = fromJS({});

export default function (state = initState, action, threadID) {
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
        input.setSelectionRange(selectStart+1, selectEnd+1)
      }, 200);

      return state
        .update(threadID,
          message => message
            ? message.substring(0,selectStart) + action.emoji + message.substring(selectEnd)
            : action.emoji);
  }
}
