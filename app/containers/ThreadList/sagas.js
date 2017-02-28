import {takeLatest} from "redux-saga";
import {take, put, select} from "redux-saga/effects";
import {getThreadList, getThreadInfo, getUserInfo, getThreadHistory} from "../App/actions/requests"
import {LOGIN_PASSED, THREAD_LIST_RECEIVED} from "../App/actions/responses";
import {selectUser, selectCurrentThreadID} from "../App/selectors";

function* getThreadDetails(action) {
  const threadID = yield select(selectCurrentThreadID());
  const firstThread = action.data[0];
  if (!threadID && firstThread) {
    yield put(getThreadHistory(firstThread.threadID));
  }

  for (let thread of Object.values(action.data)) {
    yield put(getThreadInfo(thread.threadID));
    for (let participant of thread.participants) {
      const user = yield select(selectUser(participant));
      if (user.size == 0) {
        yield put(getUserInfo(participant));
      }
    }
  }
}

function* main() {
  yield takeLatest(THREAD_LIST_RECEIVED, getThreadDetails);
  yield take(LOGIN_PASSED);
  yield put(getThreadList());
}

export default main;
