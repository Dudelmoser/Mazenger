import {createSelector} from "reselect";
import {selectThreadHistory, selectCurrentUserID} from "../App/selectors";
import {fromJS} from "immutable";

const selectMessage = (index, threadID) => createSelector(
  selectThreadHistory(threadID),
  (history) => history ? history.get(index) : fromJS({})
);

const selectSenderID = (index, threadID) => createSelector(
  selectMessage(index, threadID),
  (message) => message ? message.get("senderID").replace("fbid:", "") : ""
);

// bugged under certain circumstances
const selectIsOwn = (index, threadID) => createSelector(
  selectSenderID(index, threadID),
  selectCurrentUserID(),
  (sender, user) => {
    return (sender && user) ? sender == user : false
  }
);

const selectTimeStamp = (index, threadID) => createSelector(
  selectMessage(index, threadID),
  (message) => message ? message.get("timestamp") : 0
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

export {
  selectMessage,
  selectSenderID,
  selectTimeStamp,
  selectIsOwn,
  selectIsSequel,
  selectTimePassed,
}
