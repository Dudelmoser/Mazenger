import {takeEvery} from "redux-saga";
import {REVOKE_AES_KEY, SEND_PUBLIC_KEY} from "./actions";

function* sendPublicKey() {

}

function* revokeAesKey() {

}

function* main() {
  yield takeEvery(SEND_PUBLIC_KEY, sendPublicKey);
  yield takeEvery(REVOKE_AES_KEY, revokeAesKey);
}

export default main;
