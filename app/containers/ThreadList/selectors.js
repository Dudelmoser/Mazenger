import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {THREADS, USERS} from "./constants";
import {selectSession} from "../LoginModal/selectors";

const selectThreads = () => createSelector(
  selectSession(),
  (session) => session.get(THREADS) || fromJS({})
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
  selectSession(),
  (session) => session.get(USERS) || fromJS({})
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
