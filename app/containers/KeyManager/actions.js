export const IMPORT_KEYS = "KeyManager.importKeys";
export const EXPORT_KEYS = "KeyManager.exportKeys";
export const SEND_PUBLIC_KEY = "KeyManager.sendPublicKey";
export const ENCRYPT_MESSAGE ="KeyManager.encryptMessage";
export const DISABLE_ENCRYPTION = "KeyManager.disableEncryption";
export const MESSAGE_DECRYPTED = "KeyManager.messageDecrypted";
export const THREAD_INFO_DECRYPTED = "KeyManager.threadInfoDecrypted";
export const THREAD_LIST_DECRYPTED = "KeyManager.threadListDecrypted";
export const THREAD_HISTORY_DECRYPTED = "KeyManager.threadHistoryDecrypted";
export const SAVE_PRIVATE_KEY = "KeyManager.savePrivateKey";
export const SAVE_SYMMETRIC_KEY = "KeyManager.saveSymmetricKey";
export const SET_ENCRYPTED = "KeyManager.setEncrypted";

export function exportKeys() {
  return {
    type: EXPORT_KEYS
  }
}

export function importKeys(str) {
  const keys = JSON.parse(str);
  return {
    type: IMPORT_KEYS,
    keys
  }
}

/*
Encryption related user actions that are handled by the crypto saga.
*/
export function sendPublicKey(threadID) {
  return {
    type: SEND_PUBLIC_KEY,
    threadID
  }
}

export function encryptMessage(threadID, message) {
  return {
    type: ENCRYPT_MESSAGE,
    threadID,
    message
  }
}

export function disableEncryption(threadID) {
  return {
    type: DISABLE_ENCRYPTION,
    threadID
  }
}

/*
Encryption related internal actions that are handled by the reducer.
*/
export function savePrivateKey(threadID, key) {
  return {
    type: SAVE_PRIVATE_KEY,
    threadID,
    key
  }
}

export function saveSymmetricKey(threadID, key) {
  return {
    type: SAVE_SYMMETRIC_KEY,
    threadID,
    key
  }
}

export function setEncrypted(threadID, isEncrypted) {
  return {
    type: SET_ENCRYPTED,
    threadID,
    isEncrypted,
  }
}

/*
Renamed actions for incoming data that are triggered after decryption.
*/
export function messageDecrypted(action) {
  action.type = MESSAGE_DECRYPTED;
  return action;
}

export function threadInfoDecrypted(action) {
  action.type = THREAD_INFO_DECRYPTED;
  return action;
}

export function threadListDecrypted(action) {
  action.type = THREAD_LIST_DECRYPTED;
  return action;
}

export function threadHistoryDecrypted(action) {
  action.type = THREAD_HISTORY_DECRYPTED;
  return action;
}

/* A short comparison of possible action syntaxes */

/*
Requires redux-actions and doesn't allow custom payload keys.
Furthermore createAction falsely suggests an action instead of action creator.
*/
// export const exportKeys = createAction(EXPORT_KEYS);

/* ES6 syntax for actions without payload */
// export const exportKeys = () => ({type: EXPORT_KEYS});

/* ES6 syntax which resembles actions with payload */
// export const exportKeys = () => ({
//   type: EXPORT_KEYS
// });

/* ES6 for action creator with payload */
// export const importKeys = (string) => ({
//   type: IMPORT_KEYS,
//   keys
// });
