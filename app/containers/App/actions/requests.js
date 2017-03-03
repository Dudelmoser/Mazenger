// facebook-chat-api requests
export const LOGIN = "fb.login";
export const LISTEN = "fb.listen";
export const LOGOUT = "fb.logout";
export const GET_THREAD_LIST = "fb.getThreadList";
export const GET_THREAD_INFO = "fb.getThreadInfo";
export const GET_THREAD_HISTORY = "fb.getThreadHistory";
export const GET_USER_ID = "fb.getUserID";
export const GET_USER_INFO = "fb.getUserInfo";
export const GET_FRIENDS_LIST = "fb.getFriendsList";
export const RESOLVE_PHOTO_URL = "fb.resolvePhotoUrl";
export const SEND_MESSAGE = "fb.sendMessage";
export const DELETE_MESSAGE = "fb.deleteMessage";
export const UPLOAD_IMAGE = "uploadImage";

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

export function getThreadHistory(threadID) {
  return {
    type: GET_THREAD_HISTORY,
    args: [threadID, 0, 20, null]
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

export function sendMessage(message, threadID, attachment) {
  return {
    type: SEND_MESSAGE,
    args: [{
      body: message,
      attachment
    }, threadID]
  }
}

export function deleteMessage(messageID) {
  return {
    type: DELETE_MESSAGE,
    args: [messageID]
  }
}

export function uploadImage(dataURL) {
  return {
    type: UPLOAD_IMAGE,
    args: dataURL
  }
}
