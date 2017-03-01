import {fromJS} from "immutable";
import {MESSAGE_SENT} from "../App/actions/responses";
import {CHANGE_MESSAGE} from "./actions";
import {INSERT_EMOJI} from "../EmojisTab/actions";

const initState = fromJS({});

export default function (state = initState, action, curUserID, curThreadID) {
  switch (action.type) {

    case MESSAGE_SENT:
      return state
        .set(action.threadID, "");

    case CHANGE_MESSAGE:
      return state
        .set(curThreadID, action.message);

    case INSERT_EMOJI:
      if (!action.emoji)
        return state;

      let input = document.getElementById("input");
      let selectStart = input.selectionStart;
      let selectEnd = input.selectionEnd;

      return state
        .update(curThreadID,
          message => message
            ? message.substring(0,selectStart) + action.emoji + message.substring(selectEnd)
            : action.emoji);
  }
}
