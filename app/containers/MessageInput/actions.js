export const CHANGE_MESSAGE = "changeMessage";
export const SEND_PUBLIC_KEY = "sendPublicKey";
export const REVOKE_AES_KEY = "revokeAesKey";
export const ENCRYPT_MESSAGE ="encryptMessage";
export const MESSAGE_DECRYPTED = "messageDecrypted";
export const THREAD_LIST_DECRYPTED = "threadListDecrypted";
export const THREAD_HISTORY_DECRYPTED = "threadHistoryDecrypted";
export const SAVE_PRIVATE_KEY = "savePrivateKey";
export const SAVE_AES_KEY = "saveAESKey";

export function changeMessage(message) {
  return {
    type: CHANGE_MESSAGE,
    message,
  };
}

export function sendPublicKey(threadID) {
  return {
    type: SEND_PUBLIC_KEY,
    threadID
  }
}

export function savePrivateKey(threadID, key) {
  return {
    type: SAVE_PRIVATE_KEY,
    threadID,
    key
  }
}

export function saveAESKey(threadID, key) {
  return {
    type: SAVE_AES_KEY,
    threadID,
    key
  }
}

export function revokeAesKey(threadID) {
  return {
    type: REVOKE_AES_KEY,
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

export function messageDecrypted(action) {
  action.type = MESSAGE_DECRYPTED;
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
