import {fromJS} from "immutable";
import {MESSAGE_SENT} from "../App/actions/responses";
import {CHANGE_MESSAGE} from "./actions";
import {INSERT_EMOJI} from "../EmojiList/actions";
import {INPUT_ID} from "./constants";

const initState = fromJS({});

export default function(state = initState, action, threadID) {
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

      /*
      Add an emoji on the cursor position inside the message input.
      Should potentially be moved to the component to keep the reducer free from UI logic.
      */
      const input = document.getElementById(INPUT_ID);
      const selectStart = input.selectionStart;
      const selectEnd = input.selectionEnd;

      input.focus();
      /*
       Put the cursor at the end of the newly inserted emoji.
       Must be delayed because taking focus takes a short while and resets the selection.
       */
      setTimeout(() => {
        input.setSelectionRange(selectStart+2, selectEnd+2)
      }, 200);

      /* Update the cached message. */
      return state
        .update(threadID,
          message => message
            ? message.substring(0,selectStart) + action.emoji + message.substring(selectEnd)
            : action.emoji);
  }
}
