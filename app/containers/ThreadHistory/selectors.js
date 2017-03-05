import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectRoot} from "../App/selectors";
import {HISTORIES, TYPERS} from "./constants";
import {selectCurrentThreadID} from "../LoginModal/selectors";
import {selectUsers} from "../ThreadList/selectors";

const selectHistories = () => createSelector(
  selectRoot(),
  (root) => root.get(HISTORIES) || fromJS({})
);

const selectHistory = (threadID) => createSelector(
  selectHistories(),
  (histories) => histories.get(threadID) || fromJS([])
);

const selectCurrentHistory = () => createSelector(
  selectHistories(),
  selectCurrentThreadID(),
  (histories, threadID) => histories.get(threadID) || fromJS([])
);

const selectAllTypers = () => createSelector(
  selectRoot(),
  (root) => root.get(TYPERS) || fromJS({})
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
  selectHistories,
  selectHistory,
  selectCurrentHistory,
  selectAllTypers,
  selectCurrentTypersNames,
  selectMessageCount,
};
