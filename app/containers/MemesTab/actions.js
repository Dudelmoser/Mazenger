export const ADD_MEME = "addMeme";
export const RENDER_MEME = "renderMeme";
export const SET_TOP_CAPTION = "setTopCaption";
export const SET_BOTTOM_CAPTION = "setBottomCaption";
export const PICK_MEME = "pickMeme";
export const SEND_MEME = "sendMeme";

export function addMeme(url) {
  return {
    type: ADD_MEME,
    url
  }
}

export function pickMeme(cat, idx, url) {
  return {
    type: PICK_MEME,
    cat,
    idx,
    url,
  }
}

export function setTopCaption(str) {
  return {
    type: SET_TOP_CAPTION,
    str
  }
}

export function setBottomCaption(str) {
  return {
    type: SET_BOTTOM_CAPTION,
    str
  }
}

export function sendMeme() {
  return {
    type: SEND_MEME
  }
}
