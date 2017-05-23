import {createSelector} from "reselect";
import {Map, List} from "immutable";
import {selectHistory} from "../ThreadHistory/selectors";
import {selectCurrentUserID} from "../LoginModal/selectors";
import {IS_MSG_SELECT} from "../ThreadHistory/constants";

const selectMessage = (index, threadID) => createSelector(
  selectHistory(threadID),
  (history, showCmds) => history.get(index) || Map()
);

const selectMessageBody = (index, threadID) => createSelector(
  selectMessage(index, threadID),
  (message) => message.get("body")
);

const selectAttachments = (index, threadID) => createSelector(
  selectMessage(index, threadID),
  (message) => message.get("attachments") || List()
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
  selectCurrentUserID(),
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
  (message) => message.get("participantNames", List()).get(0) || ""
);

const selectIsSelected = (index, threadID) => createSelector(
  selectMessage(index, threadID),
  (message) => message.get(IS_MSG_SELECT) || false
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
  selectIsSelected,
}
