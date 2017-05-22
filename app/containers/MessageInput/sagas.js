import {takeEvery} from "redux-saga";
import {put, select, call} from "redux-saga/effects";
import forge from "node-forge";
import {
  ENCRYPT_MESSAGE, DISABLE_ENCRYPTION, SEND_PUBLIC_KEY,
  threadHistoryDecrypted, saveSymmetricKey, savePrivateKey, messageDecrypted,
} from "./actions";
import {AD_TAG, EK_TAG, PK_TAG, DSBL_TAG, CHECK_STR, CT_TAG} from "./constants";
import {selectLatestKey, selectPrivateKey, selectSymmetricKeys} from "./selectors";
import {THREAD_HISTORY_RECEIVED, THREAD_LIST_RECEIVED, UPDATE_RECEIVED} from "../App/actions/responses";
import {sendMessage} from "../App/actions/requests";
import {selectCurrentUserID} from "../LoginModal/selectors";

const RSA_EXPONENT = 0x10001;
const RSA_KEY_BITS = 1024;
const AES_KEY_BYTES = 32;
const TAG_PREFIX = "» ";
const VAL_PREFIX = "\n";

function pemToStr(pem) {
  return pem.replace(/(?:\r|\n|-|BEGIN |END |PUBLIC KEY)/g, "");
}

function strToPem(str) {
  return "-----BEGIN PUBLIC KEY-----" + str + "-----END PUBLIC KEY-----";
}

function createTaggedMessage(tag, ...values) {
  let msg = TAG_PREFIX + tag;
  for (let val of values)
    msg += "\n" + val;
  return msg;
}

function* decrypt(msg, threadID) {
  if (!msg)
    return "";
  if (!msg.startsWith(TAG_PREFIX + CT_TAG))
    return msg;

  const parts = msg.split(VAL_PREFIX);
  const ctBytes = forge.util.decode64(parts[1]);
  const ivBytes = forge.util.decode64(parts[2]);

  const keys = yield select(selectSymmetricKeys(threadID));
  for (let key of keys.reverse().toJS()) {
    const decipher = forge.cipher.createDecipher("AES-CBC", key);
    decipher.start({iv: ivBytes});
    decipher.update(forge.util.createBuffer(ctBytes));
    decipher.finish();
    const msg = decipher.output.getBytes();
    if (msg.startsWith(CHECK_STR))
      return msg.substr(CHECK_STR.length);
  }
  return msg;
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

function* encryptMessage(action) {
  const key = yield select(selectLatestKey(action.threadID));
  if (key) {
    const iv = forge.random.getBytesSync(AES_KEY_BYTES);
    const cipher = forge.cipher.createCipher("AES-CBC", key);
    cipher.start({iv: iv});
    const buffer = forge.util.createBuffer(CHECK_STR + action.message);
    cipher.update(buffer);
    cipher.finish();
    const ctBytes = cipher.output.getBytes();
    const ctBase64 = forge.util.encode64(ctBytes);
    const ivBase64 = forge.util.encode64(iv);
    action.message = createTaggedMessage(CT_TAG, ctBase64, ivBase64);
  }
  yield put(sendMessage(action.threadID, action.message));
}

function* sendPublicKey(action) {
  const keypair = forge.pki.rsa.generateKeyPair({bits: RSA_KEY_BITS, e: RSA_EXPONENT});
  const pubKey = pemToStr(forge.pki.publicKeyToPem(keypair.publicKey));
  const privKey = forge.pki.privateKeyToPem(keypair.privateKey);
  const prefix = createTaggedMessage(AD_TAG);
  const msg = createTaggedMessage(PK_TAG, pubKey);
  yield put(sendMessage(action.threadID, prefix + "\n\n" + msg));
  yield put(savePrivateKey(action.threadID, privKey));
}

function* sendEncryptedKey(threadID, pk) {
  const symKey = forge.random.getBytesSync(AES_KEY_BYTES);
  const pubKey = forge.pki.publicKeyFromPem(strToPem(pk));
  const ctBytes = pubKey.encrypt(CHECK_STR + symKey);
  const ctBase64 = forge.util.encode64(ctBytes);
  const msg = createTaggedMessage(EK_TAG, ctBase64);
  yield put(sendMessage(threadID, msg));
  yield put(saveSymmetricKey(threadID, symKey));
}

function* saveEncryptedKey(threadID, ek64) {
  const privKeyPem = yield select(selectPrivateKey(threadID));
  const privKey = forge.pki.privateKeyFromPem(privKeyPem);
  const ek = forge.util.decode64(ek64);
  const symKey = privKey.decrypt(ek);
  if (symKey.startsWith(CHECK_STR))
    yield put(saveSymmetricKey(threadID, symKey.substr(CHECK_STR.length)));
}

function* disableEncryption() {

}

function* parseUpdate(action) {
  if (action.data.type == "message" && action.data.body && action.data.body.startsWith(TAG_PREFIX)) {
    const userID = yield select(selectCurrentUserID());
    const entries = action.data.body.split(TAG_PREFIX);

    for (let i = 1; i < entries.length; i++) {
      const entry = entries[i].split(VAL_PREFIX);

      if (action.data.senderID != userID) {
        switch (entry[0]) {
          case PK_TAG:
            yield call(sendEncryptedKey, action.data.threadID, entry[1]);
            break;

          case EK_TAG:
            yield call(saveEncryptedKey, action.data.threadID, entry[1]);
            break;

          case DSBL_TAG:
            yield call(disableEncryption, action.data.threadID);
            break;
        }
      }

      if (entry[0] == CT_TAG)
        action.data.body = yield call(decrypt, action.data.body, action.data.threadID);
    }
  }
  yield put(messageDecrypted(action));
}

function* main() {
  yield takeEvery(ENCRYPT_MESSAGE, encryptMessage);
  yield takeEvery(UPDATE_RECEIVED, parseUpdate);
  yield takeEvery(THREAD_HISTORY_RECEIVED, decryptHistory);
  yield takeEvery(THREAD_LIST_RECEIVED, decryptThreadList);
  yield takeEvery(SEND_PUBLIC_KEY, sendPublicKey);
  yield takeEvery(DISABLE_ENCRYPTION, disableEncryption);
}

export default main;
