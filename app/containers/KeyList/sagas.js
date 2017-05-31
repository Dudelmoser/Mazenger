import {takeEvery, takeLatest} from "redux-saga";
import {put, select, call} from "redux-saga/effects";
import forge from "node-forge";
import {
  ENCRYPT_MESSAGE, DISABLE_ENCRYPTION, SEND_PUBLIC_KEY,
  threadHistoryDecrypted, saveSymmetricKey, savePrivateKey, messageDecrypted, setEncrypted, threadListDecrypted,
  threadInfoDecrypted,
} from "./actions";
import {
  AD_TAG, SK_TAG, PK_TAG, DSBL_TAG, CHECK_STR, CT_TAG, TAG_PREFIX, VAL_PREFIX, AES_KEY_BYTES,
  RSA_KEY_BITS, RSA_EXPONENT, CT_ICON, DSBL_ICON, SK_ICON, PK_ICON
} from "./constants";
import {selectIsEncrypted, selectLatestKey, selectPrivateKey, selectSymmetricKeys} from "./selectors";
import {
  THREAD_HISTORY_RECEIVED, THREAD_INFO_RECEIVED, THREAD_LIST_RECEIVED, UPDATE_RECEIVED
} from "../App/actions/responses";
import {sendMessage} from "../App/actions/requests";
import {selectCurrentUserID} from "../LoginModal/selectors";

/* Converts the key to the PEM format and strips the PEM headers and footers afterwards. */
function getStringFromKey(key) {
  let pem;
  if (key.hasOwnProperty("encrypt")) {
    pem = forge.pki.publicKeyToPem(key);
  } else {
    pem = forge.pki.privateKeyToPem(key);
  }
  return pem.replace(/(?:\r|\n|-|BEGIN |END |RSA |PRIVATE KEY|PUBLIC KEY)/g, "");
}

/*
Adds the PEM headers and footers and converts the string to a key object afterwards.
Public and private keys are distinguished using their size in relation to the specified key size.
*/
function getKeyFromString(str) {
  if (str.length < RSA_KEY_BITS / 4) {
    const pem = "-----BEGIN PUBLIC KEY-----" + str + "-----END PUBLIC KEY-----";
    return forge.pki.publicKeyFromPem(pem);
  } else {
    const pem = "-----BEGIN RSA PRIVATE KEY-----" + str + "-----END RSA PRIVATE KEY-----";
    return forge.pki.privateKeyFromPem(pem);
  }
}

/* Tags a list of values with the specified tag. */
function createTaggedMessage(tag, ...values) {
  let msg = TAG_PREFIX + tag;
  for (let val of values)
    msg += "\n" + val;
  return msg;
}

/* Decrypts messages and replaces meta messages with descriptive icons. */
function* decrypt(message, threadID) {
  if (!message)
    return "";

  /* Descriptive icon replacements for meta messages. */
  if (message.startsWith(TAG_PREFIX + AD_TAG))
    return PK_ICON;
  if (message.startsWith(TAG_PREFIX + SK_TAG))
    return SK_ICON;
  if (message.startsWith(TAG_PREFIX + DSBL_TAG))
    return DSBL_ICON;

  /* Actual ciphertext decryption */
  if (message.startsWith(TAG_PREFIX + CT_TAG)) {

    /* Decode the base64 encoded ciphertext and initialization vector */
    const parts = message.split(VAL_PREFIX);
    if (!parts[1] || !parts[2])
      return message;
    const ctBytes = forge.util.decode64(parts[1]);
    const ivBytes = forge.util.decode64(parts[2]);

    /*
    Iterate through the AES keys belonging to this thread until the right key is found.
    The right key is found if the decrypted string starts with a check string.
    */
    const keys = yield select(selectSymmetricKeys(threadID));
    for (let key of keys.reverse().toJS()) {
      const decipher = forge.cipher.createDecipher("AES-CBC", key);
      decipher.start({iv: ivBytes});
      decipher.update(forge.util.createBuffer(ctBytes));
      decipher.finish();
      let msg;
      try {
        msg = forge.util.decodeUtf8(decipher.output.getBytes());
      } catch (e) {
        msg = decipher.output.getBytes();
      }
      if (msg.startsWith(CHECK_STR))
        return msg.substr(CHECK_STR.length);
    }
    return CT_ICON;
  } else {
    /* Keep untagged messages untouched. */
    return message;
  }
}

/* Calls decrypt() for every thread info snippet. */
function* decryptThreadInfo(action) {
  action.data.snippet = yield call(decrypt, action.data.snippet, action.data.threadID);
  yield put(threadInfoDecrypted(action))
}

/* Calls decrypt() for every thread list snippet. */
function* decryptThreadList(action) {
  for (let i = 0; i < action.data.length; i++) {
    action.data[i].snippet = yield call(decrypt, action.data[i].snippet, action.data[i].threadID);
  }
  yield put(threadListDecrypted(action));
}

/*
Calls decrypt() for every thread history message body.
Attachments are NOT encrypted.
*/
function* decryptHistory(action) {
  for (let i = 0; i < action.data.length; i++) {
    action.data[i].body = yield call(decrypt, action.data[i].body, action.args[0]);
  }
  yield put(threadHistoryDecrypted(action));
}

/* Encrypts messages if encryption is enabled for this thread and keys available. */
function* encryptMessage(action) {
  console.log(this);
  const isEncrypted = yield select(selectIsEncrypted(action.threadID));
  const key = yield select(selectLatestKey(action.threadID));

  if (isEncrypted && key) {
    const iv = forge.random.getBytesSync(AES_KEY_BYTES);
    const cipher = forge.cipher.createCipher("AES-CBC", key);
    cipher.start({iv: iv});
    /* Encode the message with UTF8 to allow special characters, emojis etc. */
    const text = forge.util.encodeUtf8(CHECK_STR + action.message);
    const buffer = forge.util.createBuffer(text);
    cipher.update(buffer);
    cipher.finish();
    const ctBytes = cipher.output.getBytes();
    /* Encode the raw byte keys and IVs with base64 */
    const ctBase64 = forge.util.encode64(ctBytes);
    const ivBase64 = forge.util.encode64(iv);

    /* Replace the original message property with the tagged encrypted message. */
    action.message = createTaggedMessage(CT_TAG, ctBase64, ivBase64);
  }

  /* Pass the original or encryped message to the facebook chat API. */
  yield put(sendMessage(action.threadID, action.message));
}

/* Sends the public RSA key and saves the private RSA key. */
function* sendPublicKey(action) {
  const keypair = forge.pki.rsa.generateKeyPair({bits: RSA_KEY_BITS, e: RSA_EXPONENT});
  const pubKey = getStringFromKey(keypair.publicKey);
  const privKey = getStringFromKey(keypair.privateKey);
  const prefix = createTaggedMessage(AD_TAG);
  const msg = createTaggedMessage(PK_TAG, pubKey);
  yield put(sendMessage(action.threadID, prefix + "\n\n" + msg));
  yield put(savePrivateKey(action.threadID, privKey));
}

/* Sends the symmetric AES key encrypted with the public RSA key. */
function* sendEncryptedKey(threadID, pk) {
  const symKey = forge.random.getBytesSync(AES_KEY_BYTES);
  const pubKey = getKeyFromString(pk);
  const ctBytes = pubKey.encrypt(CHECK_STR + symKey);
  const ctBase64 = forge.util.encode64(ctBytes);
  const msg = createTaggedMessage(SK_TAG, ctBase64);
  yield put(sendMessage(threadID, msg));
  yield put(saveSymmetricKey(threadID, symKey));
  yield put(setEncrypted(threadID, true));
}

/* Decrypts the AES key with the private RSA key and saves it. */
function* saveEncryptedKey(threadID, ek64) {
  const privKeyStr = yield select(selectPrivateKey(threadID));
  const privKey = getKeyFromString(privKeyStr);
  const ek = forge.util.decode64(ek64);
  const symKey = privKey.decrypt(ek);
  if (symKey.startsWith(CHECK_STR)) {
    yield put(saveSymmetricKey(threadID, symKey.substr(CHECK_STR.length)));
    yield put(setEncrypted(threadID, true));
  }
}

/* Sends a disable encryption tag. */
function* disableEncryption(action) {
  const msg = createTaggedMessage(DSBL_TAG);
  yield put(sendMessage(action.threadID, msg));
  yield put(setEncrypted(action.threadID, false));
}

/* Splits the message into prefix, tag and values and calls the appropriate handler. */
function* parseMessage(action) {
  if (action.data.type === "message" && action.data.body && action.data.body.startsWith(TAG_PREFIX)) {

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
  /* Handle events triggered by user */
  yield takeLatest(SEND_PUBLIC_KEY, sendPublicKey);
  yield takeLatest(ENCRYPT_MESSAGE, encryptMessage);
  yield takeLatest(DISABLE_ENCRYPTION, disableEncryption);
  /* Decrypt or execute new messages */
  yield takeLatest(UPDATE_RECEIVED, parseMessage);
  /* Decrypt old messages */
  yield takeEvery(THREAD_INFO_RECEIVED, decryptThreadInfo);
  yield takeEvery(THREAD_LIST_RECEIVED, decryptThreadList);
  yield takeEvery(THREAD_HISTORY_RECEIVED, decryptHistory);
}

export default main;
