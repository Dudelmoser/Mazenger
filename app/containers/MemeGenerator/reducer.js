import {fromJS, List, Map} from "immutable";
import Meme from "../../utils/meme";
import {PICK_MEME, SET_TOP_CAPTION, SET_BOTTOM_CAPTION, RENDER_MEME, SEND_MEME} from "./actions";
import {
  CURRENT_MEME, TOP_CAPTION, BOTTOM_CAPTION, TOP100_MEMES, CUSTOM_MEMES, ACTIVE_CAT, FAVORITE_MEMES
} from "./constants";
import {IMAGE_UPLOADED, MEMES_LOADED} from "../App/actions/responses";
import {CLEAR_USER_DATA} from "../PrivacySettings/actions";

const initState = Map();
/* Doesn't work if imported for some reason !?*/
const MEME_CANVAS_ID = "memeCanvas";

export default function(state = initState, action) {
  const img = state.get(CURRENT_MEME, Map()).get("url");
  const top = state.get(TOP_CAPTION);
  const bot = state.get(BOTTOM_CAPTION);

  switch (action.type) {

    case RENDER_MEME:
      if (img)
        Meme(img, MEME_CANVAS_ID, top, bot);
      return state;

    case SET_TOP_CAPTION:
      Meme(img, MEME_CANVAS_ID, action.str, bot);
      return state
        .set(TOP_CAPTION, action.str);

    case SET_BOTTOM_CAPTION:
      Meme(img, MEME_CANVAS_ID, top, action.str);
      return state
        .set(BOTTOM_CAPTION, action.str);

    case PICK_MEME:
      Meme(action.url, MEME_CANVAS_ID, top, bot);
      const curMeme = state.getIn([action.cat, action.idx]) || Map();
      return state
        .set(ACTIVE_CAT, action.cat)
        .set(CURRENT_MEME, curMeme);

    case MEMES_LOADED:
      Meme(action.memes[0].url, MEME_CANVAS_ID, top, bot);
      return state
        .set(TOP100_MEMES, fromJS(action.memes))
        .set(CURRENT_MEME, fromJS(action.memes[0]));

    case IMAGE_UPLOADED:
      Meme(action.url, MEME_CANVAS_ID, top, bot);
      const memes = state.get(CUSTOM_MEMES) || List();
      const meme = fromJS({name: "" + memes.count(), url: action.url});
      return state
        .withMutations(state => {
          state.set(CUSTOM_MEMES, memes.push(meme));
        })
        .set(CURRENT_MEME, meme)
        .set(ACTIVE_CAT, CUSTOM_MEMES);

    case SEND_MEME:
      return state
        .withMutations(state => {
          const curMeme = state.get(CURRENT_MEME);

          /*
          Move the recently sent meme to the top of the favorite memes.
          Memes are identified by their URL combined with their name.
          */
          const faves = state
              .get(FAVORITE_MEMES, List())
              .filter(fave =>
                !(fave.get("url") === curMeme.get("url") && fave.get("name") === curMeme.get("name")))
              .insert(0, fromJS({name: curMeme.get("name"), url: curMeme.get("url")}));

          state.set(FAVORITE_MEMES, faves);
        });

    case CLEAR_USER_DATA:
      return initState;
  }
}
