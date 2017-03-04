import {createSelector} from "reselect";
import {selectRoot} from "../App/selectors";
import {fromJS} from "immutable";
import {selectMyUserID} from "../LoginModal/selectors";
import {MEMES, TOP_CAPTION, BOTTOM_CAPTION, CURRENT_MEME, TOP100_MEMES, CUSTOM_MEMES, FAVORITE_MEMES, ACTIVE_CAT} from "./constants";

const selectMemes = () => createSelector(
  selectRoot(),
  (root) => root.get(MEMES) || fromJS({})
);

const selectMyMemes = () => createSelector(
  selectMemes(),
  selectMyUserID(),
  (memes, userID) => memes.get(userID) || fromJS({})
);

const selectTopCaption = () => createSelector(
  selectMyMemes(),
  (memes) => memes.get(TOP_CAPTION) || ""
);

const selectBottomCaption = () => createSelector(
  selectMyMemes(),
  (memes) => memes.get(BOTTOM_CAPTION) || ""
);

const selectCurrentMeme = () => createSelector(
  selectMyMemes(),
  (memes) => memes.get(CURRENT_MEME) || fromJS({})
);

const selectTop100Memes = () => createSelector(
  selectMyMemes(),
  (memes) => memes.get(TOP100_MEMES) || fromJS([])
);

const selectCustomMemes = () => createSelector(
  selectMyMemes(),
  (memes) => memes.get(CUSTOM_MEMES) || fromJS([])
);

const selectFavoriteMemes = () => createSelector(
  selectMyMemes(),
  (memes) => memes.get(FAVORITE_MEMES) || fromJS([])
);

const selectActiveCategory = () => createSelector(
  selectMyMemes(),
  (memes) => memes.get(ACTIVE_CAT) || TOP100_MEMES
);

export {
  selectMemes,
  selectMyMemes,
  selectTopCaption,
  selectBottomCaption,
  selectCurrentMeme,
  selectTop100Memes,
  selectCustomMemes,
  selectFavoriteMemes,
  selectActiveCategory,
}
