import {takeLatest} from "redux-saga";
import {put, select} from "redux-saga/effects";
import {deleteMessage, getThreadHistory, getThreadPictures} from "../App/actions/requests"
import {DELETE_MESSAGES, LOAD_MORE_MESSAGES} from "./actions";
import {selectHistory, selectOldestTimestamp} from "./selectors";
import {IS_MSG_SELECT} from "./constants";
import {selectCurrentThreadID} from "../LoginModal/selectors";
import {THREAD_HISTORY_RECEIVED} from "../App/actions/responses";

/* Delete selected messages from the server. */
function* deleteMessages() {
  const threadID = yield select(selectCurrentThreadID());
  const history = yield select(selectHistory(threadID));
  const selected = [];
  history.filter(msg => msg.get(IS_MSG_SELECT)).forEach(msg => {
    if (msg) selected.push(msg.get("messageID"));
  });
  yield put(deleteMessage(selected));
}

/*
Load older messages after reaching the end of the thread history.
TODO: Load the older history before reaching the end for a smoother scrolling experience.
*/
function* loadMoreMessages() {
  const threadID = yield select(selectCurrentThreadID());
  const timestamp = yield select(selectOldestTimestamp());
  yield put(getThreadHistory(threadID, timestamp - 1));
}

/*
Load all recent pictures of the current thread for the photo viewer.
TODO: Load pictures dynamically depending on timestamp of the currently displayed photo.
*/
function* loadThreadPictures() {
  const threadID = yield select(selectCurrentThreadID());
  yield put(getThreadPictures(threadID));
}

export default function* main() {
  yield takeLatest(DELETE_MESSAGES, deleteMessages);
  yield takeLatest(LOAD_MORE_MESSAGES, loadMoreMessages);
  yield takeLatest(THREAD_HISTORY_RECEIVED, loadThreadPictures);
}
