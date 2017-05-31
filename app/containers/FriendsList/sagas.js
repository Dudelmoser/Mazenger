import {takeLatest} from "redux-saga";
import {put, select} from "redux-saga/effects";
import {getUserInfo} from "../App/actions/requests"
import {FRIENDS_LIST_RECEIVED} from "../App/actions/responses";
import {selectUser} from "../ThreadList/selectors";

/* Fetch additional user info as soon as the friends list is received. */
function* getFriendDetails(action) {
  for (let friend of action.data) {
    const user = yield select(selectUser(friend.currentUserID));
    if (!user) {
      yield put(getUserInfo(friend.currentUserID));
    }
  }
}

function* main() {
  yield takeLatest(FRIENDS_LIST_RECEIVED, getFriendDetails);
}

export default main;
