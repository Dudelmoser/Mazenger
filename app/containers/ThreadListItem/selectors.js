import {createSelector} from "reselect";
import {selectUsers, selectThreadInfo} from "../App/selectors";

const selectThreadTitle = (threadID) => createSelector(
  selectThreadInfo(threadID),
  (thread) => thread ? thread.get("name") : ""
);

const selectThreadSnippet = (threadID) => createSelector(
  selectThreadInfo(threadID),
  (thread) => thread ? thread.get("snippet") : [] // react-emoji error workaround
);

const selectThreadImageURL = (threadID) => createSelector(
  selectThreadInfo(threadID),
  selectUsers(),
  (thread, users) => {
    if (!thread)
      return "";
    const userID = thread.get("participantIDs") ? thread.get("participantIDs").get(0) : "";
    const imageURL = users.get(userID) ? users.get(userID).get("thumbSrc") : ""
    return imageURL;
  }
);

export {
  selectThreadTitle,
  selectThreadSnippet,
  selectThreadImageURL,
}
