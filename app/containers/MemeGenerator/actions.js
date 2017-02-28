export const ADD_MEME = "addMeme";
export const RENDER_MEME = "renderMeme";
export const SET_TOP_CAPTION = "setTopCaption";
export const SET_BOTTOM_CAPTION = "setBottomCaption";
export const PICK_MEME = "pickMeme";
export const MEMES_LOADED = "memesLoaded";

export function renderMeme() {
  return {
    type: RENDER_MEME
  }
}

export function pickMeme(url) {
  return {
    type: PICK_MEME,
    url
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

export function memesLoaded(memes) {
  return {
    type: MEMES_LOADED,
    memes
  }
}

export function addMeme() {
  return {
    type: ADD_MEME
  }
}