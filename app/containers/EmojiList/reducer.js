import {INSERT_EMOJI, OPEN_EMOJI_GROUP} from "./actions";
import {THREADS, OUTBOX, CURRENT_THREAD, EMOJIS, FAVORITES, OPEN_GROUPS} from "../App/state";

export default function (state, action) {
  const threadID = state.getIn([THREADS, CURRENT_THREAD]);
  switch (action.type) {

    case INSERT_EMOJI:
      if (!action.emoji)
        return state;

      let input = document.getElementById("input");
      let selectStart = input.selectionStart;
      let selectEnd = input.selectionEnd;

      return state
        .updateIn([EMOJIS, FAVORITES, action.emoji], count => count ? count + 1 : 1)
        .updateIn([THREADS, threadID, OUTBOX],
          message => message
            ? message.substring(0,selectStart) + action.emoji + message.substring(selectEnd)
            : action.emoji);

    case OPEN_EMOJI_GROUP:
      return state
        .updateIn([EMOJIS, OPEN_GROUPS, action.index], state => !state);
  }
}
