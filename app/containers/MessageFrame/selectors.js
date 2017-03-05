import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectHistory} from "../ThreadHistory/selectors";
import {selectMyUserID} from "../LoginModal/selectors";

const selectMessage = (index, threadID) => createSelector(
  selectHistory(threadID),
  (history) => history.get(index) || fromJS({})
);

const selectMessageBody = (index, threadID) => createSelector(
  selectMessage(index, threadID),
  (message) => message.get("body")
);

const selectAttachments = (index, threadID) => createSelector(
  selectMessage(index, threadID),
  (message) => message.get("attachments") || fromJS([])
)

const selectAttachmentsCount = (index, threadID) => createSelector(
  selectAttachments(index, threadID),
  (attachments) => attachments.count()
)

const selectSenderID = (index, threadID) => createSelector(
  selectMessage(index, threadID),
  (message) => message.get("senderID", "").replace("fbid:", "") || ""
);

// bugged under certain circumstances
const selectIsOwn = (index, threadID) => createSelector(
  selectSenderID(index, threadID),
  selectMyUserID(),
  (sender, user) => sender == user
);

const selectTimeStamp = (index, threadID) => createSelector(
  selectMessage(index, threadID),
  (message) => message.get("timestamp") || 0
);

const selectIsSequel = (index, threadID) => createSelector(
  selectMessage(index - 1, threadID),
  selectMessage(index, threadID),
  (prevMsg, msg) => {
    if (!prevMsg || !msg || index - 1 < 0)
      return false;
    return prevMsg.get("senderID") == msg.get("senderID")
  }
);

const selectTimePassed = (index, threadID) => createSelector(
  selectMessage(index - 1, threadID),
  selectMessage(index, threadID),
  (prevMsg, msg) => {
    if (!prevMsg || !msg || index < 1)
      return Number.MAX_VALUE;
    return msg.get("timestamp") - prevMsg.get("timestamp");
  }
);

const selectSenderName = (index, threadID) => createSelector(
  selectMessage(index, threadID),
  (message) => message.get("participantNames", fromJS([])).get(0) || ""
);

export {
  selectMessage,
  selectSenderID,
  selectTimeStamp,
  selectIsOwn,
  selectIsSequel,
  selectTimePassed,
  selectSenderName,
  selectMessageBody,
  selectAttachments,
  selectAttachmentsCount,
}
