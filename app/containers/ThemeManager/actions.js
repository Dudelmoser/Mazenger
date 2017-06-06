export const CHANGE_ACCENT_COLOR = "ThemeManager.changeAccentColor";
export const CHANGE_BACKGROUND_COLOR = "ThemeManager.changeBackgroundColor";

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
