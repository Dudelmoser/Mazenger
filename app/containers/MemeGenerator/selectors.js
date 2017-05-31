import {createSelector} from "reselect";
import {List, Map} from "immutable";
import {selectSession} from "../LoginModal/selectors";
import {MEMES, TOP_CAPTION, BOTTOM_CAPTION, CURRENT_MEME, TOP100_MEMES, CUSTOM_MEMES, FAVORITE_MEMES, ACTIVE_CAT} from "./constants";

const selectMemes = () => createSelector(
  selectSession(),
  (session) => session.get(MEMES) || Map()
);

export const selectTopCaption = () => createSelector(
  selectMemes(),
  (memes) => memes.get(TOP_CAPTION) || ""
);

export const selectBottomCaption = () => createSelector(
  selectMemes(),
  (memes) => memes.get(BOTTOM_CAPTION) || ""
);

export const selectCurrentMeme = () => createSelector(
  selectMemes(),
  (memes) => memes.get(CURRENT_MEME) || Map()
);

export const selectTop100Memes = () => createSelector(
  selectMemes(),
  (memes) => memes.get(TOP100_MEMES) || List()
);

export const selectCustomMemes = () => createSelector(
  selectMemes(),
  (memes) => memes.get(CUSTOM_MEMES) || List()
);

export const selectFavoriteMemes = () => createSelector(
  selectMemes(),
  (memes) => memes.get(FAVORITE_MEMES) || List()
);

export const selectActiveCategory = () => createSelector(
  selectMemes(),
  (memes) => memes.get(ACTIVE_CAT) || TOP100_MEMES
);
