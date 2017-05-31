import {selectSession} from "../LoginModal/selectors";
import {AUTOREPLY, GLOBAL, ENABLED, DICT} from "./constants";
import {Map, List} from "immutable";
import {createSelector} from "reselect";
import {selectCurrentThreadID} from "../LoginModal/selectors";


const selectAutoReplies = () => createSelector(
  selectSession(),
  (session) => session.get(AUTOREPLY) || Map()
);

const selectGlobalAutoReplies = () => createSelector(
  selectAutoReplies(),
  (bot) => bot.get(GLOBAL) || Map()
);

export const selectIsGlobalEnabled = () => createSelector(
  selectGlobalAutoReplies(),
  (bot) => bot.get(ENABLED) || false
);

export const selectGlobalDict = () => createSelector(
  selectGlobalAutoReplies(),
  (bot) => List(bot.get(DICT, Map()).reverse())
);

const selectLocalReplies = () => createSelector(
  selectAutoReplies(),
  selectCurrentThreadID(),
  (bot, threadID) => bot.get(threadID) || Map()
);

export const selectIsLocalEnabled = () => createSelector(
  selectLocalReplies(),
  (bot) => bot.get(ENABLED) || false
);

export const selectLocalDict = () => createSelector(
  selectLocalReplies(),
  (bot) => List(bot.get(DICT, Map()).reverse())
);
