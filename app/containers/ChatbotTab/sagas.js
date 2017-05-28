import {takeEvery} from "redux-saga";
import {put, select} from "redux-saga/effects";
import {selectGlobalDict, selectLocalDict, selectIsGlobalEnabled, selectIsLocalEnabled} from "./selectors";
import {selectCurrentUserID} from "../LoginModal/selectors";
import {encryptMessage, MESSAGE_DECRYPTED} from "../KeyList/actions";

function* sendResponse(action) {
  const data = action.data || {}
  const userID = yield select(selectCurrentUserID());
  if (data.type == "message" && data.senderID != userID) {

    const isGlobalOn = yield select(selectIsGlobalEnabled());
    if (isGlobalOn) {
      const globalDict = yield select(selectGlobalDict());
      for (let entry of globalDict.toJS()) {
        if (data.body.match(new RegExp(entry[0], "i")))
          yield put(encryptMessage(data.threadID, entry[1]));
      }
    }

    const isLocalOn = yield select(selectIsLocalEnabled());
    if (isLocalOn) {
      const localDict = yield select(selectLocalDict());
      for (let entry of localDict.toJS()) {
        if (data.body.match(new RegExp(entry[0]), "i"))
          yield put(encryptMessage(data.threadID, entry[1]));
      }
    }
  }
}

function* main() {
  yield takeEvery(MESSAGE_DECRYPTED, sendResponse);
}

export default main;
