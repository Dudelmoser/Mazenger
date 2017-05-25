export const CHANGE_EMAIL = "fb.changeEmail";
export const CHANGE_PASSWORD = "fb.changePassword";

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
