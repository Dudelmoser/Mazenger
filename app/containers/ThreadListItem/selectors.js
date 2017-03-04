import {createSelector} from "reselect";
import {selectThread, selectUsers} from "../ThreadList/selectors";
import {fromJS} from "immutable";

const selectThreadTitle = (threadID) => createSelector(
  selectThread(threadID),
  (thread) => thread.get("name") || ""
);

const selectThreadSnippet = (threadID) => createSelector(
  selectThread(threadID),
  (thread) => thread.get("snippet") || " " // react-emoji error workaround
);

const selectThreadImageURL = (threadID) => createSelector(
  selectThread(threadID),
  selectUsers(),
  (thread, users) => {
    const participants = thread.get("participantIDs");
    const userID = participants ? participants.get(0) : "";
    const user = users.get(userID);
    const imageURL = user ? user.get("thumbSrc") : "";
    return imageURL;
  }
);

const selectSnippetAttachments = (threadID) => createSelector(
  selectThread(threadID),
  (thread) => thread.get("snippetAttachments") || fromJS([])
);

const selectHasAttachment = (thread) => createSelector(
  selectSnippetAttachments(thread),
  (attachments) => attachments.count() > 0
);

export {
  selectThreadTitle,
  selectThreadSnippet,
  selectThreadImageURL,
  selectHasAttachment,
}
