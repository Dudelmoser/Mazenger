export const CONNECTED = "connected";
export const DISCONNECTED = "disconnected";
export const CLEAR_CACHE = "clearCache";
export const CLOSE_PHOTO = "closePhoto";

export function connected() {
  return {
    type: CONNECTED
  };
}

export function disconnected() {
  return {
    type: DISCONNECTED
  };
}

export function closePhoto() {
  return {
    type: CLOSE_PHOTO
  };
}
