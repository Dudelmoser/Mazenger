import {fromJS} from "immutable";
import Meme from "../../utils/meme";
import {PICK_MEME, SET_TOP_CAPTION, SET_BOTTOM_CAPTION, RENDER_MEME, SEND_MEME} from "./actions";
import {CURRENT_MEME, TOP_CAPTION, BOTTOM_CAPTION, TOP100_MEMES, CUSTOM_MEMES, ACTIVE_CAT, FAVORITE_MEMES
} from "./constants";
import {IMAGE_UPLOADED, MEMES_LOADED} from "../App/actions/responses";

const CANVAS_ID = "memeCanvas";
const initState = fromJS({});

export default function(state = initState, action, curUserID, curThreadID) {
  const img = state.getIn([curUserID, CURRENT_MEME], fromJS({})).get("url");
  const top = state.getIn([curUserID, TOP_CAPTION]);
  const bot = state.getIn([curUserID, BOTTOM_CAPTION]);

  switch (action.type) {

    case RENDER_MEME:
      if (img)
        Meme(img, CANVAS_ID, top, bot);
      return state;

    case SET_TOP_CAPTION:
      Meme(img, CANVAS_ID, action.str, bot);
      return state
        .setIn([curUserID, TOP_CAPTION], action.str);

    case SET_BOTTOM_CAPTION:
      Meme(img, CANVAS_ID, top, action.str);
      return state
        .setIn([curUserID, BOTTOM_CAPTION], action.str);

    case PICK_MEME:
      Meme(action.url, CANVAS_ID, top, bot);
      const curMeme = state.getIn([curUserID, action.cat, action.idx]) || fromJS({});
      return state
        .setIn([curUserID, ACTIVE_CAT], action.cat)
        .setIn([curUserID, CURRENT_MEME], curMeme);

    case MEMES_LOADED:
      Meme(action.memes[0].url, CANVAS_ID, top, bot);
      return state
        .setIn([curUserID, TOP100_MEMES], fromJS(action.memes))
        .setIn([curUserID, CURRENT_MEME], fromJS(action.memes[0]));

    case IMAGE_UPLOADED:
      Meme(action.url, CANVAS_ID, top, bot);
      const memes = state.getIn([curUserID, CUSTOM_MEMES]) || fromJS([]);
      const meme = fromJS({name: "" + memes.count(), url: action.url});
      return state
        .withMutations(state => {
          state.setIn([curUserID, CUSTOM_MEMES], memes.push(meme));
        })
        .setIn([curUserID, CURRENT_MEME], meme)
        .setIn([curUserID, ACTIVE_CAT], CUSTOM_MEMES);

    case SEND_MEME:
      return state
        .withMutations(state => {
          const curMeme = state.getIn([curUserID, CURRENT_MEME]);

          let faves = state
              .getIn([curUserID, FAVORITE_MEMES], fromJS([]))
              .filter(fave => {
                if (fave.get("url") == curMeme.get("url") && fave.get("name") == curMeme.get("name"))
                  return false;
                return true;
              })
              .insert(0, fromJS({name: curMeme.get("name"), url: curMeme.get("url")}));

          state.setIn([curUserID, FAVORITE_MEMES], faves);
        })
  }
}
