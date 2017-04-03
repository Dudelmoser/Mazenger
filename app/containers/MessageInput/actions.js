export const CHANGE_MESSAGE = "fb.changeMessage";
export const SEND_PUBLIC_KEY = "fb.sendPublicKey";
export const REVOKE_AES_KEY = "fb.revokeAesKey";

export function changeMessage(message) {
  return {
    type: CHANGE_MESSAGE,
    message,
  };
}

export function sendPublicKey() {
  return {
    type: SEND_PUBLIC_KEY
  }
}

export function revokeAesKey() {
  return {
    type: REVOKE_AES_KEY
  }
}
