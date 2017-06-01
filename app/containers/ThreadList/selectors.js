import {createSelector} from "reselect";
import {Map} from "immutable";
import {THREADS, USERS} from "./constants";
import {selectSession} from "../LoginModal/selectors";

export const selectThreads = () => createSelector(
  selectSession(),
  (session) => session.get(THREADS) || Map()
);

export const selectThread = (threadID) => createSelector(
  selectThreads(),
  (threads) => threads.get(threadID) || Map()
);

/* Show recently active threads first. */
export const selectThreadIDs = () => createSelector(
  selectThreads(),
  (threads) => threads
    .toList()
    .sort((a, b) => {
      const tsa = a.get("timestamp");
      const tsb = b.get("timestamp");
      if (tsa > tsb) { return -1; }
      if (tsa < tsb) { return 1; }
      if (tsa === tsb) { return 0; }
    }).map(thread => thread.get("threadID"))
);

export const selectUsers = () => createSelector(
  selectSession(),
  (session) => session.get(USERS) || Map()
);

export const selectUser = (userID) => createSelector(
  selectUsers(),
  (users) => users.get(userID) || Map()
);
