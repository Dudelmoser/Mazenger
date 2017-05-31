export const CHANGE_EMAIL = "LoginModal.changeEmail";
export const CHANGE_PASSWORD = "LoginModal.changePassword";

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email: email
  }
}

export function changePassword() {
  return {
    type: CHANGE_PASSWORD,
  }
}
