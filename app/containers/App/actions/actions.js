export const CONNECTED = "connected";
export const DISCONNECTED = "disconnected";
export const CLEAR_CACHE = "clearCache";

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
