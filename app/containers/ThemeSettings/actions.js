export const CHANGE_ACCENT_COLOR = "changeAccentColor";
export const CHANGE_BACKGROUND_COLOR = "changeBackgroundColor";

export function changeAccentColor(key) {
  return {
    type: CHANGE_ACCENT_COLOR,
    key
  }
}

export function changeBackgroundColor(key) {
  return {
    type: CHANGE_BACKGROUND_COLOR,
    key
  }
}
