import {createSelector} from "reselect";
import {fromJS, List, Map} from "immutable";
import {HISTORIES, TYPERS} from "./constants";
import {selectCurrentThreadID, selectSession} from "../LoginModal/selectors";
import {selectUsers} from "../ThreadList/selectors";

const selectHistories = () => createSelector(
  selectSession(),
  (session) => session.get(HISTORIES) || fromJS([])
);

const selectHistory = (threadID) => createSelector(
  selectHistories(),
  (histories) => histories.get(threadID) || List()
);

const selectCurrentHistory = () => createSelector(
  selectHistories(),
  selectCurrentThreadID(),
  (histories, threadID) => histories.get(threadID) || List()
);

const selectAllTypers = () => createSelector(
  selectSession(),
  (session) => session.get(TYPERS) || Map()
);

const selectCurrentTypers = () => createSelector(
  selectAllTypers(),
  selectCurrentThreadID(),
  (typers, threadID) => typers.get(threadID) || Map()
);

const selectCurrentTypersNames = () => createSelector(
  selectCurrentTypers(),
  selectUsers(),
  (typers, users) => {
    let result = [];
    typers.forEach((timestamp, userID) =>
      result.push(users.get(userID, Map()).get("name")));
    return result;
  }
);

const selectMessageCount = () => createSelector(
  selectCurrentHistory(),
  (history) => history.count() || 0
);

const selectOldestTimestamp = () => createSelector(
  selectCurrentHistory(),
  (history) => {
    const first = history.first();
    let timestamp;
    if (first) {
      timestamp = first.get("timestamp");
    } else {
      timestamp = Date.now();
    }
    return timestamp;
  }
);

export {
  selectHistory,
  selectCurrentHistory,
  selectAllTypers,
  selectCurrentTypersNames,
  selectMessageCount,
  selectOldestTimestamp,
};
