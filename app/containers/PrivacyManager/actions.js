export const CLEAR_USER_DATA = "PrivacyManager.clearUserData";
export const SET_CLEAR_DIALOG = "PrivacyManager.setClearDialog";

export function clearUserData() {
  return {
    type: CLEAR_USER_DATA
  }
}

export function setClearDialog(visible) {
  return {
    type: SET_CLEAR_DIALOG,
    visible
  }
}
