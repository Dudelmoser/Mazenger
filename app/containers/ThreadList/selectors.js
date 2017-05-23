import {createSelector} from "reselect";
import {Map} from "immutable";
import {THREADS, USERS} from "./constants";
import {selectSession} from "../LoginModal/selectors";

const selectThreads = () => createSelector(
  selectSession(),
  (session) => session.get(THREADS) || Map()
);

const selectThread = (threadID) => createSelector(
  selectThreads(),
  (threads) => threads.get(threadID) || Map()
);

const selectThreadIDs = () => createSelector(
  selectThreads(),
  (threads) => threads
    .toList()
    .sort((a, b) => {
      const tsa = a.get("timestamp");
      const tsb = b.get("timestamp");
      if (tsa > tsb) { return -1; }
      if (tsa < tsb) { return 1; }
      if (tsa == tsb) { return 0; }
    }).map(thread => thread.get("threadID"))
);

const selectUsers = () => createSelector(
  selectSession(),
  (session) => session.get(USERS) || Map()
);

const selectUser = (userID) => createSelector(
  selectUsers(),
  (users) => users.get(userID) || Map()
);

export {
  selectThreads,
  selectThread,
  selectThreadIDs,
  selectUsers,
  selectUser,
};
