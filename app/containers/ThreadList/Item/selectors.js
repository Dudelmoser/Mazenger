import {createSelector} from "reselect";
import {selectThread, selectUsers} from "../selectors";
import {selectAllTypers} from "../../ThreadHistory/selectors";
import {fromJS} from "immutable";
import {selectCurrentUserID} from "../../LoginModal/selectors";

export const selectThreadTitle = (threadID) => createSelector(
  selectThread(threadID),
  selectUsers(),
  selectCurrentUserID(),
  (thread, users, me) => {
    const userIDs = thread.get("participantIDs") || fromJS([]);
    let title = "";
    userIDs.forEach(userID => {
      if (userID == me)
        return;
      if (title)
        title += ", ";
      const user = users.get(userID);
      title += user ? user.get("firstName") || "" : ""
    });
    return title;
  }
);

export const selectThreadSnippet = (threadID) => createSelector(
  selectThread(threadID),
  (thread) => thread.get("snippet") || ""
);

export const selectThreadImageURL = (threadID) => createSelector(
  selectThread(threadID),
  selectUsers(),
  (thread, users) => {
    const participants = thread.get("participantIDs");
    const userID = participants ? participants.get(0) : "";
    const user = users.get(userID);
    return user ? user.get("thumbSrc") : "";
  }
);

export const selectSnippetAttachments = (threadID) => createSelector(
  selectThread(threadID),
  (thread) => thread.get("snippetAttachments") || fromJS([])
);

export const selectHasAttachment = (threadID) => createSelector(
  selectSnippetAttachments(threadID),
  (attachments) => attachments.count() > 0
);

export const selectTypers = (threadID) => createSelector(
  selectAllTypers(),
  (typers) => typers.get(threadID) || fromJS({})
);

/* Can be simplified cause API doesn't reveil data for group chats. */
export const selectTypersNames = (threadID) => createSelector(
  selectTypers(threadID),
  selectUsers(),
  (typers, users) => {
    let result = [];
    typers.forEach((timestamp, userID) =>
      result.push(users.get(userID, fromJS({})).get("name")));
    return result;
  }
);

export const selectTypersNamesStr = (threadID) => createSelector(
  selectTypersNames(threadID),
  (typers) => {
    let result = "";
    typers.forEach(name =>
      result += (result ? ", " : "") + name
    );
    return result + " ";
  }
);

/* Bad performance compared to array.length should be insignificant. */
export const selectTypersCount = (threadID) => createSelector(
  selectTypersNames(threadID),
  (names) => names.length
);
