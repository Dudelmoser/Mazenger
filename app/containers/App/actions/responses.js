// facebook-chat-api responses
export const LOGIN_PASSED = "fb.loginPassed";
export const LOGIN_FAILED = "fb.loginFailed";
export const THREAD_LIST_RECEIVED = "fb.threadListReceived";
export const THREAD_INFO_RECEIVED = "fb.threadInfoReceived";
export const THREAD_HISTORY_RECEIVED = "fb.threadHistoryReceived";
export const USER_IDS_RECEIVED = "fb.userIDsReceived";
export const USER_INFO_RECEIVED = "fb.userInfoReceived";
export const FRIENDS_LIST_RECEIVED = "fb.friendsListReceived";
export const PHOTO_URL_RESOLVED = "fb.photoUrlResolved";
export const UPDATE_RECEIVED = "fb.updateReceived";
export const MESSAGE_SENT = "fb.messageSent";

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
    threadID: res.args[1]
  }
}