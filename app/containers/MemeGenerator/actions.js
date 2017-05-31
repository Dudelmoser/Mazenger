export const ADD_MEME = "MemeGenerator.addMeme";
export const RENDER_MEME = "MemeGenerator.renderMeme";
export const SET_TOP_CAPTION = "MemeGenerator.setTopCaption";
export const SET_BOTTOM_CAPTION = "MemeGenerator.setBottomCaption";
export const PICK_MEME = "MemeGenerator.pickMeme";
export const SEND_MEME = "MemeGenerator.sendMeme";

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
