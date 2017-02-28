import {createSelector} from "reselect";
import {selectThreads} from "../App/selectors";
import {INBOX, ARCHIVE} from "../App/state";

const selectThreadInbox = () => createSelector(
  selectThreads(),
  (threads) => threads.get(INBOX)
);

const selectThreadArchive = () => createSelector(
  selectThreads(),
  (threads) => threads.get(ARCHIVE)
);

const selectThreadIDs = () => createSelector(
  selectThreads(),
  (threads) => threads.keySeq().toArray().filter(element => {

    // removes inbox, archived and current thread
    if (!parseInt(element))
      return false;

    // removes self-thread caused by an unknown bug
    if (threads.get(element) && !threads.get(element).get("info"))
      return false;
    return true;
  })
);

export {
  selectThreadInbox,
  selectThreadArchive,
  selectThreadIDs,
};
