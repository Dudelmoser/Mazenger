export const CHANGE_MESSAGE = "changeMessage";
export const SEND_PUBLIC_KEY = "sendPublicKey";
export const ENCRYPT_MESSAGE ="encryptMessage";
export const DISABLE_ENCRYPTION = "disableEncryption";
export const MESSAGE_DECRYPTED = "messageDecrypted";
export const THREAD_INFO_DECRYPTED = "threadInfoDecrypted";
export const THREAD_LIST_DECRYPTED = "threadListDecrypted";
export const THREAD_HISTORY_DECRYPTED = "threadHistoryDecrypted";
export const SAVE_PRIVATE_KEY = "savePrivateKey";
export const SAVE_SYMMETRIC_KEY = "saveSymmetricKey";
export const SET_ENCRYPTED = "setEncrypted";

export function changeMessage(message) {
  return {
    type: CHANGE_MESSAGE,
    message,
  };
}

/* encryption related user actions that are handled by the crypto saga */

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

/* encryption related internal actions that are handled by the reducer */

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

/* renamed actions for incoming data that are triggered after decryption */

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
