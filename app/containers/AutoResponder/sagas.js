import {takeEvery} from "redux-saga";
import {put, select} from "redux-saga/effects";
import {selectGlobalDict, selectLocalDict, selectIsGlobalEnabled, selectIsLocalEnabled} from "./selectors";
import {selectCurrentUserID} from "../LoginModal/selectors";
import {encryptMessage, MESSAGE_DECRYPTED} from "../KeyList/actions";

function* sendResponse(action) {
  const data = action.data || {};
  const userID = yield select(selectCurrentUserID());

  /* Don't respond to outgoing or non-textual messages. */
  if (data.type === "message" && data.senderID != userID) {

    /* Match the message against every regex of the global dictionary. */
    const isGlobalOn = yield select(selectIsGlobalEnabled());
    if (isGlobalOn) {
      const globalDict = yield select(selectGlobalDict());
      for (let entry of globalDict.toJS()) {
        if (data.body.toLowerCase().match(new RegExp(entry[0], "i")))
          yield put(encryptMessage(data.threadID, entry[1]));
      }
    }

    /* Same with the thread-specific ("local") dictionary. */
    const isLocalOn = yield select(selectIsLocalEnabled());
    if (isLocalOn) {
      const localDict = yield select(selectLocalDict());
      for (let entry of localDict.toJS()) {
        if (data.body.toLowerCase().match(new RegExp(entry[0], "i")))
          yield put(encryptMessage(data.threadID, entry[1]));
      }
    }
  }
}

function* main() {
  yield takeEvery(MESSAGE_DECRYPTED, sendResponse);
}

export default main;
