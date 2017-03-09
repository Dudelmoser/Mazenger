export const CONNECTED = "fb.connected";
export const DISCONNECTED = "fb.disconnected";
export const CLEAR_CACHE = "fb.clearCache";

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

export function clearCache() {
  return {
    type: CLEAR_CACHE
  }
}
