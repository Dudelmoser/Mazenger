export const CLEAR_SETTINGS = "clearSettings";
export const CONFIRM_CLEAR_SETTINGS = "confirmClearSettings";

export function clearSettings() {
  return {
    type: CLEAR_SETTINGS
  }
}

export function confirmClearSettings(cancel) {
  return {
    type: CONFIRM_CLEAR_SETTINGS,
    cancel
  }
}
