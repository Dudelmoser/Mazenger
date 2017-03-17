import {takeEvery} from "redux-saga";
import {put, select} from "redux-saga/effects";
import {UPDATE_RECEIVED} from "../App/actions/responses";
import {selectGlobalDict, selectLocalDict, selectIsGlobalEnabled, selectIsLocalEnabled} from "./selectors";
import {sendMessage} from "../App/actions/requests";
import {selectCurrentUserID} from "../LoginModal/selectors";

function* sendResponse(action) {
  const data = action.data || {}
  const userID = yield select(selectCurrentUserID());
  if (data.type == "message" && data.senderID != userID) {

    const isGlobalOn = yield select(selectIsGlobalEnabled());
    if (isGlobalOn) {
      const globalDict = yield select(selectGlobalDict());
      for (let entry of globalDict.toJS()) {
        if (data.body.match(new RegExp(entry[0], "i")))
          yield put(sendMessage(data.threadID, entry[1]));
      }
    }

    const isLocalOn = yield select(selectIsLocalEnabled());
    if (isLocalOn) {
      const localDict = yield select(selectLocalDict());
      for (let entry of localDict.toJS()) {
        if (data.body.match(new RegExp(entry[0]), "i"))
          yield put(sendMessage(data.threadID, entry[1]));
      }
    }
  }
}

function* main() {
  yield takeEvery(UPDATE_RECEIVED, sendResponse);
}

export default main;
