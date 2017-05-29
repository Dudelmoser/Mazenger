export const LOGIN = "login";
export const LISTEN = "listen";
export const LOGOUT = "logout";
export const GET_THREAD_LIST = "getThreadList";
export const GET_THREAD_INFO = "getThreadInfo";
export const GET_THREAD_HISTORY = "getThreadHistory";
export const GET_THREAD_PICTURES = "getThreadPictures";
export const GET_USER_ID = "getUserID";
export const GET_USER_INFO = "getUserInfo";
export const GET_FRIENDS_LIST = "getFriendsList";
export const RESOLVE_PHOTO_URL = "resolvePhotoUrl";
export const SEND_MESSAGE = "sendMessage";
export const DELETE_MESSAGE = "deleteMessage";
export const UPLOAD_IMAGE = "uploadImage";
export const LOAD_MEMES = "loadMemes";

export function login(args) {
  return {
    type: LOGIN,
    args: [args]
  };
}

export function listen() {
  return {
    type: LISTEN,
    args: []
  }
}

export function logout() {
  return {
    type: LOGOUT,
    args: []
  }
}

export function getThreadList() {
  return {
    type: GET_THREAD_LIST,
    args: [0, 20, "inbox"] //"archived"
  }
}

export function getThreadInfo(threadID) {
  return {
    type: GET_THREAD_INFO,
    args: [threadID]
  }
}

/**
* Get a thread history
* @param {Integer} threadID Thread ID
* @param {Timestamp} [startAt] Timestamp at which the thread history chunk shall start
* @param {Integer} [count] Number of messages to fetch with one request. Avoid requesting large chunks at once.
*/
export function getThreadHistory(threadID, startAt, count = 20) {
  return {
    type: GET_THREAD_HISTORY,
    args: [threadID, count, startAt || Date.now()]
  }
}

export function getThreadPictures(threadID, limit = 8, offset = 0) {
  return {
    type: GET_THREAD_PICTURES,
    args: [threadID, offset, limit]
  }
}

export function getUserID(name) {
  return {
    type: GET_USER_ID,
    args: [name]
  }
}

export function getUserInfo(userIDs) {
  return {
    type: GET_USER_INFO,
    args: [userIDs]
  }
}

export function getFriendsList() {
  return {
    type: GET_FRIENDS_LIST,
    args: []
  }
}

export function resolvePhotoUrl(photoID) {
  return {
    type: RESOLVE_PHOTO_URL,
    args: [photoID]
  }
}

export function sendMessage(threadID, message, attachment) {
  let action = {
    type: SEND_MESSAGE,
    args: [{
      body: message
    }, threadID]
  }
  if (attachment)
    action.args[0].attachment = attachment;
  return action;
}

export function deleteMessage(messageID) {
  return {
    type: DELETE_MESSAGE,
    args: [messageID],
  }
}

export function uploadImage(dataURL) {
  return {
    type: UPLOAD_IMAGE,
    args: dataURL
  }
}

export function loadMemes() {
  return {
    type: LOAD_MEMES,
    args: []
  }
}
