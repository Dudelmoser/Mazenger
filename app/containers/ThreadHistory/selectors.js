import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectRoot} from "../App/selectors";
import {HISTORIES, TYPERS} from "./constants";
import {selectMyThreadID} from "../LoginModal/selectors";
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
  selectMyThreadID(),
  (histories, threadID) => histories.get(threadID) || fromJS([])
);

const selectTypers = () => createSelector(
  selectRoot(),
  (root) => root.get(TYPERS) || fromJS({})
);

const selectCurrentTypers = () => createSelector(
  selectTypers(),
  selectUsers(),
  selectMyThreadID(),
  (typers, users, threadID) => {
    const myTypers = typers.get(threadID) || fromJS({});
    let result = [];
    myTypers.forEach((timestamp, userID) =>
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
  selectCurrentTypers,
  selectMessageCount,
};
