import {takeLatest} from "redux-saga";
import {put, select} from "redux-saga/effects";
import {deleteMessage} from "../App/actions/requests"
import {DELETE_MESSAGES} from "./actions";
import {selectHistory} from "./selectors";
import {IS_MSG_SELECT} from "./constants";
import {selectCurrentThreadID} from "../LoginModal/selectors";

function* deleteMessages() {
  const threadID = yield select(selectCurrentThreadID());
  const history = yield select(selectHistory(threadID));
  const selected = [];
  history.forEach((msg, index) => {
    if (msg.get(IS_MSG_SELECT)) {
      selected.push({
        messageID: msg.get("messageID"),
        threadID,
        index,
      });
    }
  });
  console.log(selected);
  for (let msg of selected) {
    yield put(deleteMessage(msg.messageID, msg.threadID, msg.index));
  }
}

export default function* main() {
  yield takeLatest(DELETE_MESSAGES, deleteMessages);
}
