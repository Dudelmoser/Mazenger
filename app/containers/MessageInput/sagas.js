import {takeEvery} from "redux-saga";
import {put, select, call} from "redux-saga/effects";
import {
  ENCRYPT_MESSAGE, messageDecrypted, REVOKE_AES_KEY, savePrivateKey, SEND_PUBLIC_KEY,
  threadHistoryDecrypted
} from "./actions";
import CryptoJS from "crypto-js";
import JSEncrypt from "../../utils/jsencrypt.min";
import {AES_TAG, PK_PREFIX, SK_PREFIX} from "./constants";
import {selectPublicKey, selectPasswords} from "./selectors";
import {THREAD_HISTORY_RECEIVED, THREAD_LIST_RECEIVED, UPDATE_RECEIVED} from "../App/actions/responses";
import {sendMessage} from "../App/actions/requests";
import {selectCurrentUserID} from "../LoginModal/selectors";

function getRandomPassword() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const passwordLength = 64;

  let password = "";
  for(let i = 0; i < password_length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

function* decrypt(msg, threadID) {
  if (!msg)
    return "";
  const keys = yield select(selectPasswords(threadID));
  // filter encryption messages
  if (msg.startsWith(PK_PREFIX) || msg.startsWith(SK_PREFIX)) {
    return "";
  } else {
    for (let key of keys) {
      const decrypted = CryptoJS.AES.decrypt(msg, key).toString(CryptoJS.enc.Utf8);
      if (decrypted.startsWith(AES_TAG))
        return decrypted.substr(AES_TAG.length);
    }
  }
  return msg;
}

function* decryptMessage(action) {
  if (action.data.type == "message" && action.data.body) {
    const userID = yield select(selectCurrentUserID());
    if (action.data.senderID != userID) {
      if (action.data.body.startsWith(PK_PREFIX)) {
        const pk = action.data.body.replace(PK_PREFIX, "");
        const pw = getRandomPassword();
        const crypt = new JSEncrypt({default_key_size: 1024});
        crypt.setPublicKey(pk);
        const res = SK_PREFIX + crypt.encrypt(pw);
        yield put(sendMessage(res));
        yield put(saveAESKey(action.data.threadID, pw));

      } else if (action.data.body.startsWith(SK_PREFIX)) {
        const sk = yield select(selectPublicKey(action.data.threadID));
        const JSEncrypt = new JSEncrypt({default_key_size: 1024});
        JSEncrypt.setPrivateKey(sk);
        const aes = JSEncrypt.decrypt(action.data.body.replace(SK_PREFIX, ""));
        yield put(saveAESKey(action.data.threadID, aes));
      }
    }
    action.data.body = yield call(decrypt, action.data.body, action.data.threadID);
  }
  yield put(messageDecrypted(action));
}

function* decryptHistory(action) {
  for (let i = 0; i < action.data.length; i++) {
    action.data[i].body = yield call(decrypt, action.data[i].body, action.args[0]);
  }
  yield put(threadHistoryDecrypted(action));
}

function* decryptThreadList(action) {
  for (let i = 0; i < action.data.length; i++) {
    action.data[i].snippet = yield call(decrypt, action.data[i].snippet, action.data[i].threadID);
  }
}

function reduceKey(key) {
  return key
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "")
    .replace("-----BEGIN RSA PRIVATE KEY-----", "")
    .replace("-----END RSA PRIVATE KEY-----", "")
    .replace(/(?:\r\n|\r|\n)/g, "");
}

function* sendPublicKey(action) {
  const crypt = new JSEncrypt({default_key_size: 1024});
  crypt.getKey();
  const pk = reduceKey(crypt.getPublicKey());
  const sk = reduceKey(crypt.getPrivateKey());
  yield put(sendMessage(action.threadID, PK_PREFIX + pk));
  yield put(savePrivateKey(sk));
}

function* revokeAesKey() {

}

function* encryptMessage(action) {
  const pwd = yield select(selectLatestPassword(action.threadID));
  const msg = action.message;
  if (pwd) {
  }
}

function* main() {
  yield takeEvery(ENCRYPT_MESSAGE, encryptMessage);
  yield takeEvery(UPDATE_RECEIVED, decryptMessage);
  yield takeEvery(THREAD_HISTORY_RECEIVED, decryptHistory);
  yield takeEvery(THREAD_LIST_RECEIVED, decryptThreadList);
  yield takeEvery(SEND_PUBLIC_KEY, sendPublicKey);
  yield takeEvery(REVOKE_AES_KEY, revokeAesKey);
}

export default main;
