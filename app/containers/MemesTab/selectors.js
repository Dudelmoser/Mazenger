import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectSession} from "../LoginModal/selectors";
import {MEMES, TOP_CAPTION, BOTTOM_CAPTION, CURRENT_MEME, TOP100_MEMES, CUSTOM_MEMES, FAVORITE_MEMES, ACTIVE_CAT} from "./constants";

const selectMemes = () => createSelector(
  selectSession(),
  (session) => session.get(MEMES) || fromJS({})
);

const selectTopCaption = () => createSelector(
  selectMemes(),
  (memes) => memes.get(TOP_CAPTION) || ""
);

const selectBottomCaption = () => createSelector(
  selectMemes(),
  (memes) => memes.get(BOTTOM_CAPTION) || ""
);

const selectCurrentMeme = () => createSelector(
  selectMemes(),
  (memes) => memes.get(CURRENT_MEME) || fromJS({})
);

const selectTop100Memes = () => createSelector(
  selectMemes(),
  (memes) => memes.get(TOP100_MEMES) || fromJS([])
);

const selectCustomMemes = () => createSelector(
  selectMemes(),
  (memes) => memes.get(CUSTOM_MEMES) || fromJS([])
);

const selectFavoriteMemes = () => createSelector(
  selectMemes(),
  (memes) => memes.get(FAVORITE_MEMES) || fromJS([])
);

const selectActiveCategory = () => createSelector(
  selectMemes(),
  (memes) => memes.get(ACTIVE_CAT) || TOP100_MEMES
);

export {
  selectTopCaption,
  selectBottomCaption,
  selectCurrentMeme,
  selectTop100Memes,
  selectCustomMemes,
  selectFavoriteMemes,
  selectActiveCategory,
}
