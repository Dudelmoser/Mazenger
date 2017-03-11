import {selectRoot} from "../App/selectors";
import {CHATBOT, TASKS, DICTIONARY} from "./constants";
import {Map} from "immutable";
import {selectMyUserID} from "../LoginModal/selectors";
import {createSelector} from "reselect";

const selectChatbots = () => createSelector(
  selectRoot(),
  (root) => root.get(CHATBOT) || Map()
);

const selectMyChatbots = () => createSelector(
  selectChatbots(),
  selectMyUserID(),
  (bots, userID) => bots.get(userID) || Map()
);

const selectChatbot = (threadID) => createSelector(
  selectMyChatbots(),
  (bots) => bots.get(threadID) || Map()
);

const selectTasks = (threadID) => createSelector(
  selectMyChatbot(threadID),
  (bot) => bot.get(TASKS)
);

const selectDictionary = (threadID) => createSelector(
  selectMyChatbot(threadID),
  (bot) => bot.get(DICTIONARY)
);
