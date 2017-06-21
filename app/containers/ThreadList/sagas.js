import {takeLatest} from "redux-saga";
import {put, select} from "redux-saga/effects";
import {getThreadList, getUserInfo, getThreadHistory, getThreadPictures} from "../App/actions/requests"
import {LOGIN_PASSED, THREAD_LIST_RECEIVED, UPDATE_RECEIVED} from "../App/actions/responses";
import {selectThread, selectUser} from "./selectors";
import {selectCurrentThreadID} from "../LoginModal/selectors";

function* getThreadDetails(action) {
  const threadID = yield select(selectCurrentThreadID());
  const firstThread = action.data[0];
  if (!threadID && firstThread) {
    yield put(getThreadHistory(firstThread.threadID));
  }

  for (let thread of Object.values(action.data)) {
    for (let participant of thread.participants) {
      const user = yield select(selectUser(participant));
      if (user.size === 0) {
        yield put(getUserInfo(participant));
      }
    }
  }
}

/*
Reload the thread list if a newly created thread is detected
and the thread pictures if an image is recreived.
*/
function* reloadThreadListAndPictures(action) {
  if (action.data && action.data.type === "message") {
    const thread = yield select(selectThread(action.data.threadID));
    if (!thread.size)
      yield put(getThreadList());

    for (let attach of action.data.attachments) {
      if (attach.type === "photo") {
        yield put(getThreadPictures(action.data.threadID));
        break;
      }
    }
  }
}

function* main() {
  yield takeLatest(THREAD_LIST_RECEIVED, getThreadDetails);
  yield takeLatest(LOGIN_PASSED, function* () {
    yield put(getThreadList());
  });
  yield takeLatest(UPDATE_RECEIVED, reloadThreadListAndPictures)
}

export default main;
