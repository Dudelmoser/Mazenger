import { createSelector } from "reselect";
import {selectUsers, selectCurrentThread} from "../App/selectors";
import {THREAD_HISTORY, TYPING} from "../App/state";
import {fromJS, List} from "immutable";

const selectCurrentThreadHistory = () => createSelector(
  selectCurrentThread(),
  (thread) => thread ? thread.get(THREAD_HISTORY, new List()) : new List()
);

const selectImageURLs = () => createSelector(
  selectCurrentThreadHistory(),
  selectUsers(),
  (thread, users) => {
    let imageURLs = [];
    if (thread) {
      for (let message of thread) {
        const userID = message.get("senderID", "").replace("fbid:", "");
        const imageURL = users.get(userID, fromJS({})).get("thumbSrc");
        imageURLs.push(imageURL);
      }
    }
    return imageURLs;
  }
);

const selectUsersTyping = () => createSelector(
  selectCurrentThread(),
  selectUsers(),
  (thread, users) => {
    let result = []
    let userIDs = thread ? thread.get(TYPING, fromJS({})) : fromJS({});
    userIDs.forEach((timestamp, userID) => result.push(users.get(userID, fromJS({})).get("name")));
    return result;
  }
);

export {
  selectCurrentThreadHistory,
  selectImageURLs,
  selectUsersTyping,
};
