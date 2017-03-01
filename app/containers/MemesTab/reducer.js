import {fromJS} from "immutable";
import Meme from "../../utils/meme";
import {ADD_MEME, MEMES_LOADED, PICK_MEME, SET_TOP_CAPTION, SET_BOTTOM_CAPTION, RENDER_MEME} from "./actions";
import {CURRENT_MEME, TOP_CAPTION, BOTTOM_CAPTION, RENDERED_MEME, TOP100_MEMES} from "./constants";

const CANVAS_ID = "memeCanvas";
const initState = fromJS({});

export default function(state = initState, action, curUserID, curThreadID) {
  const img = state.getIn([curUserID, CURRENT_MEME]);
  const top = state.getIn([curUserID, TOP_CAPTION]);
  const bot = state.getIn([curUserID, BOTTOM_CAPTION]);

  switch (action.type) {

    case ADD_MEME:
      return state;

    case RENDER_MEME:
      if (!img)
        return state;
      return state
        .setIn([curUserID, RENDERED_MEME], Meme(img, CANVAS_ID, top, bot));

    case SET_TOP_CAPTION:
      return state
        .setIn([curUserID, TOP_CAPTION], action.str)
        .setIn([curUserID, RENDERED_MEME], Meme(img, CANVAS_ID, action.str, bot));

    case SET_BOTTOM_CAPTION:
      return state
        .setIn([curUserID, BOTTOM_CAPTION], action.str)
        .setIn([curUserID, RENDERED_MEME], Meme(img, CANVAS_ID, top, action.str));

    case PICK_MEME:
      return state
        .setIn([curUserID, CURRENT_MEME], action.url)
        .setIn([curUserID, RENDERED_MEME], Meme(action.url, CANVAS_ID, top, bot));

    case MEMES_LOADED:
      return state
        .setIn([curUserID, TOP100_MEMES], action.memes.data.memes)
        .setIn([curUserID, RENDERED_MEME], Meme(action.memes.data.memes[0].url, CANVAS_ID, top, bot))
  }
}
