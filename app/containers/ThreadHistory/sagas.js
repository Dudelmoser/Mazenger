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
  history.filter(msg => msg.get(IS_MSG_SELECT)).forEach(msg =>
    selected.push(msg.get("messageID"))
  );
  yield put(deleteMessage(selected));
}

export default function* main() {
  yield takeLatest(DELETE_MESSAGES, deleteMessages);
}
