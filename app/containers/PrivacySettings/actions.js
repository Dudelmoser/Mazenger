export const CLEAR_USER_DATA = "PrivacySettings.clearUserData";
export const SET_CLEAR_DIALOG = "PrivacySettings.setClearDialog";

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
