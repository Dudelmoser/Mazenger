import {fromJS} from "immutable";
import Meme from "../../utils/meme";
import {MEMES_LOADED, PICK_MEME, SET_TOP_CAPTION, SET_BOTTOM_CAPTION, RENDER_MEME} from "./actions";
import {CURRENT_MEME, TOP_CAPTION, BOTTOM_CAPTION, RENDERED_MEME, TOP100_MEMES, LOCAL_MEMES} from "./constants";
import {IMAGE_UPLOADED} from "../App/actions/responses";

const CANVAS_ID = "memeCanvas";
const initState = fromJS({});

export default function(state = initState, action, curUserID, curThreadID) {
  const img = state.getIn([curUserID, CURRENT_MEME]);
  const top = state.getIn([curUserID, TOP_CAPTION]);
  const bot = state.getIn([curUserID, BOTTOM_CAPTION]);

  switch (action.type) {

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
      const memes = action.memes.data.memes;
      return state
        .setIn([curUserID, TOP100_MEMES], memes)
        .setIn([curUserID, CURRENT_MEME], memes[0].url)
        .setIn([curUserID, RENDERED_MEME], Meme(memes[0].url, CANVAS_ID, top, bot));

    case IMAGE_UPLOADED:
      return state
        .withMutations(tempState => {
          let memes = tempState.getIn([curUserID, LOCAL_MEMES]) || fromJS([]);
          tempState.setIn([curUserID, LOCAL_MEMES], memes.push({name: "Meme " + memes.count(), url: action.url}));
        })
        .setIn([curUserID, CURRENT_MEME], action.url)
        .setIn([curUserID, RENDERED_MEME], Meme(action.url, CANVAS_ID, top, bot));
  }
}
