export const LOGIN_PASSED = "loginPassed";
export const LOGIN_FAILED = "loginFailed";
export const THREAD_LIST_RECEIVED = "threadListReceived";
export const THREAD_INFO_RECEIVED = "threadInfoReceived";
export const THREAD_HISTORY_RECEIVED = "threadHistoryReceived";
export const USER_IDS_RECEIVED = "userIDsReceived";
export const USER_INFO_RECEIVED = "userInfoReceived";
export const FRIENDS_LIST_RECEIVED = "friendsListReceived";
export const PHOTO_URL_RESOLVED = "photoUrlResolved";
export const UPDATE_RECEIVED = "updateReceived";
export const MESSAGE_SENT = "messageSent";
export const IMAGE_UPLOADED = "imageUploaded";
export const MEMES_LOADED = "memesLoaded";

export function loginFailed(res) {
  return {
    type: LOGIN_FAILED,
    err: res.data
  };
}

export function loginPassed(res) {
  return {
    type: LOGIN_PASSED,
    appState: res.appState,
    currentUserID: res.currentUserID,
  };
}

export function threadListReceived(res) {
  return {
    type: THREAD_LIST_RECEIVED,
    data: res.data,
    args: res.args
  }
}

export function threadInfoReceived(res) {
  return {
    type: THREAD_INFO_RECEIVED,
    data: res.data,
    id: res.args[0]
  }
}

export function threadHistoryReceived(res) {
  return {
    type: THREAD_HISTORY_RECEIVED,
    data: res.data,
    args: res.args
  }
}

export function userIDsReceived(res) {
  return {
    type: USER_IDS_RECEIVED,
    data: res.data
  }
}

export function userInfoReceived(res) {
  return {
    type: USER_INFO_RECEIVED,
    data: res.data
  }
}

export function friendsListReceived(res) {
  return {
    type: FRIENDS_LIST_RECEIVED,
    data: res.data
  }
}

export function photoUrlResolved(res) {
  return {
    type: PHOTO_URL_RESOLVED,
    url: res.data,
    photoID: res.args[0]
  }
}

export function updateReceived(res) {
  return {
    type: UPDATE_RECEIVED,
    data: res.data
  }
}

export function messageSent(res) {
  return {
    type: MESSAGE_SENT,
    threadID: res
  }
}

export function imageUploaded(res) {
  return {
    type: IMAGE_UPLOADED,
    url: res
  }
}

export function memesLoaded(res) {
  return {
    type: MEMES_LOADED,
    memes: res
  }
}
