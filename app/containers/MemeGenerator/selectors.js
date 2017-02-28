import {createSelector} from "reselect";
import {selectRoot} from "../App/selectors";
import {MEMES, TOP100_MEMES, LOCAL_MEMES, FAVORITE_MEMES, CURRENT_MEME, TOP_CAPTION, BOTTOM_CAPTION} from "../App/state";
import {fromJS} from "immutable";

const selectMemes = () => createSelector(
  selectRoot(),
  (root) => root.get(MEMES) || fromJS({})
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
  (memes) => memes.get(CURRENT_MEME) || ""
);

const selectTop100Memes = () => createSelector(
  selectMemes(),
  (memes) => memes.get(TOP100_MEMES) || fromJS([])
);

const selectLocalMemes = () => createSelector(
  selectMemes(),
  (memes) => memes.get(LOCAL_MEMES) || fromJS([])
);

const selectFavoriteMemes = () => createSelector(
  selectMemes(),
  (memes) => memes.get(FAVORITE_MEMES) || fromJS([])
);

const selectAllMemes = () => createSelector(
  selectTop100Memes(),
  selectLocalMemes(),
  selectFavoriteMemes(),
  (top100, local, faves) => (fromJS([])).merge(top100, local, faves)
);

export {
  selectMemes,
  selectTopCaption,
  selectBottomCaption,
  selectCurrentMeme,
  selectTop100Memes,
  selectLocalMemes,
  selectFavoriteMemes,
  selectAllMemes,
}
