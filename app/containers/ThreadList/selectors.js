import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectRoot} from "../App/selectors";
import {THREADS, USERS} from "./constants";

const selectThreads = () => createSelector(
  selectRoot(),
  (root) => root.get(THREADS) || fromJS({})
);

const selectThread = (threadID) => createSelector(
  selectThreads(),
  (threads) => threads.get(threadID) || fromJS({})
);

const selectThreadIDs = () => createSelector(
  selectThreads(),
  (threads) => threads.keySeq().toArray() || []
);

const selectUsers = () => createSelector(
  selectRoot(),
  (root) => root.get(USERS) || fromJS({})
);

const selectUser = (userID) => createSelector(
  selectUsers(),
  (users) => users.get(userID) || fromJS({})
);

export {
  selectThreads,
  selectThread,
  selectThreadIDs,
  selectUsers,
  selectUser,
};
