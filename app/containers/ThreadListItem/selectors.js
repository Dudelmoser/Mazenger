import {createSelector} from "reselect";
import {selectThread, selectUsers} from "../ThreadList/selectors";
import {selectAllTypers} from "../ThreadHistory/selectors";
import {fromJS} from "immutable";
import {selectCurrentUserID} from "../LoginModal/selectors";

const selectThreadTitle = (threadID) => createSelector(
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

const selectThreadSnippet = (threadID) => createSelector(
  selectThread(threadID),
  (thread) => thread.get("snippet") || ""
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

const selectHasAttachment = (threadID) => createSelector(
  selectSnippetAttachments(threadID),
  (attachments) => attachments.count() > 0
);

const selectTypers = (threadID) => createSelector(
  selectAllTypers(),
  (typers) => typers.get(threadID) || fromJS({})
);

// can be simplified cause API doesn't reveil data for group chats
const selectTypersNames = (threadID) => createSelector(
  selectTypers(threadID),
  selectUsers(),
  (typers, users) => {
    let result = [];
    typers.forEach((timestamp, userID) =>
      result.push(users.get(userID, fromJS({})).get("name")));
    return result;
  }
);

const selectTypersNamesStr = (threadID) => createSelector(
  selectTypersNames(threadID),
  (typers) => {
    let result = "";
    typers.forEach(name =>
      result += (result ? ", " : "") + name
    );
    return result + " ";
  }
);

// bad performance compared to array.length should be insignificant
const selectTypersCount = (threadID) => createSelector(
  selectTypersNames(threadID),
  (names) => names.length
);

export {
  selectThreadTitle,
  selectThreadSnippet,
  selectThreadImageURL,
  selectHasAttachment,
  selectTypersNamesStr,
  selectTypersCount,
}
