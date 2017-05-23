import {takeEvery} from "redux-saga";
import {put, select, call} from "redux-saga/effects";
import forge from "node-forge";
import {
  ENCRYPT_MESSAGE, DISABLE_ENCRYPTION, SEND_PUBLIC_KEY,
  threadHistoryDecrypted, saveSymmetricKey, savePrivateKey, messageDecrypted,
} from "./actions";
import {
  AD_TAG, SK_TAG, PK_TAG, DSBL_TAG, CHECK_STR, CT_TAG, TAG_PREFIX, VAL_PREFIX, AES_KEY_BYTES,
  RSA_KEY_BITS, RSA_EXPONENT
} from "./constants";
import {selectLatestKey, selectPrivateKey, selectSymmetricKeys} from "./selectors";
import {THREAD_HISTORY_RECEIVED, THREAD_LIST_RECEIVED, UPDATE_RECEIVED} from "../App/actions/responses";
import {sendMessage} from "../App/actions/requests";
import {selectCurrentUserID} from "../LoginModal/selectors";


function getStringFromKey(key) {
  let pem;
  if (key.hasOwnProperty("encrypt")) {
    pem = forge.pki.publicKeyToPem(key);
  } else {
    pem = forge.pki.privateKeyToPem(key);
  }
  return pem.replace(/(?:\r|\n|-|BEGIN |END |RSA |PRIVATE KEY|PUBLIC KEY)/g, "");
}

function getKeyFromString(str) {
  if (str.length < RSA_KEY_BITS / 4) {
    const pem = "-----BEGIN PUBLIC KEY-----" + str + "-----END PUBLIC KEY-----";
    return forge.pki.publicKeyFromPem(pem);
  } else {
    const pem = "-----BEGIN RSA PRIVATE KEY-----" + str + "-----END RSA PRIVATE KEY-----";
    return forge.pki.privateKeyFromPem(pem);
  }
}

function createTaggedMessage(tag, ...values) {
  let msg = TAG_PREFIX + tag;
  for (let val of values)
    msg += "\n" + val;
  return msg;
}

function* decrypt(message, threadID) {
  if (!message)
    return "";
  if (message.startsWith(TAG_PREFIX + AD_TAG))
    return TAG_PREFIX + PK_TAG;
  if (message.startsWith(TAG_PREFIX + SK_TAG))
    return TAG_PREFIX + SK_TAG;
  if (!message.startsWith(TAG_PREFIX + CT_TAG))
    return message;

  const parts = message.split(VAL_PREFIX);
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
  return TAG_PREFIX + CT_TAG;
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
  const pubKey = getStringFromKey(keypair.publicKey);
  const privKey = getStringFromKey(keypair.privateKey);
  const prefix = createTaggedMessage(AD_TAG);
  const msg = createTaggedMessage(PK_TAG, pubKey);
  yield put(sendMessage(action.threadID, prefix + "\n\n" + msg));
  yield put(savePrivateKey(action.threadID, privKey));
}

function* sendEncryptedKey(threadID, pk) {
  const symKey = forge.random.getBytesSync(AES_KEY_BYTES);
  const pubKey = getKeyFromString(pk);
  const ctBytes = pubKey.encrypt(CHECK_STR + symKey);
  const ctBase64 = forge.util.encode64(ctBytes);
  const msg = createTaggedMessage(SK_TAG, ctBase64);
  yield put(sendMessage(threadID, msg));
  yield put(saveSymmetricKey(threadID, symKey));
}

function* saveEncryptedKey(threadID, ek64) {
  const privKeyStr = yield select(selectPrivateKey(threadID));
  const privKey = getKeyFromString(privKeyStr);
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

          case SK_TAG:
            yield call(saveEncryptedKey, action.data.threadID, entry[1]);
            break;

          case DSBL_TAG:
            yield call(disableEncryption, action.data.threadID);
            break;
        }
      }

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
