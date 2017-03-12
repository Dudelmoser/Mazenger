import {selectSession} from "../App/selectors";
import {CHATBOT, TASKS, DICTIONARY} from "./constants";
import {Map} from "immutable";
import {createSelector} from "reselect";


const selectChatbots = () => createSelector(
  selectSession(),
  (session) => session.get(CHATBOT) || Map()
);

const selectChatbot = (threadID) => createSelector(
  selectChatbots(),
  (bots) => bots.get(threadID) || Map()
);

const selectTasks = (threadID) => createSelector(
  selectChatbot(threadID),
  (bot) => bot.get(TASKS)
);

const selectDictionary = (threadID) => createSelector(
  selectChatbot(threadID),
  (bot) => bot.get(DICTIONARY)
);

export {
  selectTasks,
  selectDictionary,
}
