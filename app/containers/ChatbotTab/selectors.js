import {selectSession} from "../LoginModal/selectors";
import {CHATBOT, TASKS, DICTIONARY, GLOBAL, ENABLED, DICT} from "./constants";
import {Map, List} from "immutable";
import {createSelector} from "reselect";
import {selectCurrentThreadID} from "../LoginModal/selectors";


const selectChatbot = () => createSelector(
  selectSession(),
  (session) => session.get(CHATBOT) || Map()
);

const selectGlobalBot = () => createSelector(
  selectChatbot(),
  (bot) => bot.get(GLOBAL) || Map()
);

const selectIsGlobalEnabled = () => createSelector(
  selectGlobalBot(),
  (bot) => bot.get(ENABLED) || false
);

const selectGlobalDict = () => createSelector(
  selectGlobalBot(),
  (bot) => List(bot.get(DICT, Map()).reverse())
);

const selectLocalBot = () => createSelector(
  selectChatbot(),
  selectCurrentThreadID(),
  (bot, threadID) => bot.get(threadID) || Map()
);

const selectIsLocalEnabled = () => createSelector(
  selectLocalBot(),
  (bot) => bot.get(ENABLED) || false
);

const selectLocalDict = () => createSelector(
  selectLocalBot(),
  (bot) => List(bot.get(DICT, Map()).reverse())
);

export {
  selectIsGlobalEnabled,
  selectGlobalDict,
  selectIsLocalEnabled,
  selectLocalDict,
}
