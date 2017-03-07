import {CHANGE_PRIMARY_COLOR, CHANGE_BACKGROUND_COLOR} from "./constants";

export function changePrimaryColor(idx) {
  return {
    type: CHANGE_PRIMARY_COLOR,
    idx
  }
}

export function changeBackgroundColor(idx) {
  return {
    type: CHANGE_BACKGROUND_COLOR,
    idx
  }
}
