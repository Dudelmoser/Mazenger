import {ADD_MEME, MEMES_LOADED, PICK_MEME, SET_TOP_CAPTION, SET_BOTTOM_CAPTION, RENDER_MEME} from "./actions";
import {MEMES, TOP100_MEMES, CURRENT_MEME, TOP_CAPTION, BOTTOM_CAPTION, RENDERED_MEME} from "../App/state";
import Meme from "./meme";

export default function(state, action) {
  const img = state.getIn([MEMES, CURRENT_MEME]);
  const top = state.getIn([MEMES, TOP_CAPTION])
  const bot = state.getIn([MEMES, BOTTOM_CAPTION])

  switch (action.type) {

    case ADD_MEME:
      return state;

    case RENDER_MEME:
      if (!img)
        return state
          .setIn([MEMES, RENDERED_MEME], Meme(img, "memeCanvas", top, bot));
      return state
        .setIn([MEMES, RENDERED_MEME], Meme(img, "memeCanvas", top, bot));

    case SET_TOP_CAPTION:
      return state
        .setIn([MEMES, TOP_CAPTION], action.str)
        .setIn([MEMES, RENDERED_MEME], Meme(img, "memeCanvas", action.str, bot));

    case SET_BOTTOM_CAPTION:
      return state
        .setIn([MEMES, BOTTOM_CAPTION], action.str)
        .setIn([MEMES, RENDERED_MEME], Meme(img, "memeCanvas", top, action.str));

    case PICK_MEME:
      return state
        .setIn([MEMES, CURRENT_MEME], action.url)
        .setIn([MEMES, RENDERED_MEME], Meme(action.url, "memeCanvas", top, bot));

    case MEMES_LOADED:
      return state
        .setIn([MEMES, TOP100_MEMES], action.memes.data.memes);
  }
}
