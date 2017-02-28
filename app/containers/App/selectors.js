import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {USERS, THREADS, THREAD_INFO, USER_ID, CURRENT_USER, THREAD_HISTORY, CURRENT_THREAD} from "./state";

const selectRoot = () => state => state.get("messenger")

const selectUsers = () => createSelector(
  selectRoot(),
  (root) => root.get(USERS) || fromJS({})
);

const selectUser = (userID) => createSelector(
  selectUsers(),
  (users) => users.get(userID) || fromJS({})
);

const selectCurrentUser = () => createSelector(
  selectUsers(),
  (users) => users.get(CURRENT_USER) || fromJS({})
);

const selectCurrentUserID = () => createSelector(
  selectCurrentUser(),
  (user) => user ? user.get(USER_ID) : ""
);

const selectThreads = () => createSelector(
  selectRoot(),
  (root) => root.get(THREADS) || fromJS({})
);

const selectThread = (threadID) => createSelector(
  selectThreads(),
  (threads) => threads.get(threadID) || fromJS({})
);

const selectThreadInfo = (threadID) => createSelector(
  selectThread(threadID),
  (thread) => thread ? thread.get(THREAD_INFO) : fromJS({})
);

const selectThreadHistory = (threadID) => createSelector(
  selectThread(threadID),
  (thread) => thread ? thread.get(THREAD_HISTORY) : fromJS({})
);

const selectCurrentThreadID = () => createSelector(
  selectThreads(),
  (threads) => threads.get(CURRENT_THREAD)
);

const selectCurrentThread = () => createSelector(
  selectThreads(),
  selectCurrentThreadID(),
  (threads, curThreadID) => threads.get(curThreadID)
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectRoot,
  selectUsers,
  selectUser,
  selectCurrentUser,
  selectCurrentUserID,
  selectThreads,
  selectThread,
  selectThreadInfo,
  selectThreadHistory,
  selectCurrentThreadID,
  selectCurrentThread,
  makeSelectLocationState
};
