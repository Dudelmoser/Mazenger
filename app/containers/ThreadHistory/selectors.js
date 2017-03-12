import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {HISTORIES, TYPERS} from "./constants";
import {selectCurrentThreadID, selectSession} from "../LoginModal/selectors";
import {selectUsers} from "../ThreadList/selectors";

const selectHistories = () => createSelector(
  selectSession(),
  (session) => session.get(HISTORIES) || fromJS([])
);

const selectHistory = (threadID) => createSelector(
  selectHistories(),
  (histories) => histories.get(threadID)
);

const selectCurrentHistory = () => createSelector(
  selectHistories(),
  selectCurrentThreadID(),
  (histories, threadID) => histories.get(threadID) || fromJS([])
);

const selectAllTypers = () => createSelector(
  selectSession(),
  (session) => session.get(TYPERS) || fromJS({})
);

const selectCurrentTypers = () => createSelector(
  selectAllTypers(),
  selectCurrentThreadID(),
  (typers, threadID) => typers.get(threadID) || fromJS({})
);

const selectCurrentTypersNames = () => createSelector(
  selectCurrentTypers(),
  selectUsers(),
  (typers, users) => {
    let result = [];
    typers.forEach((timestamp, userID) =>
      result.push(users.get(userID, fromJS({})).get("name")));
    return result;
  }
);

const selectMessageCount = () => createSelector(
  selectCurrentHistory(),
  (history) => history.count() || 0
);

export {
  selectHistory,
  selectCurrentHistory,
  selectAllTypers,
  selectCurrentTypersNames,
  selectMessageCount,
};
