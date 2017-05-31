import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectSession} from "../LoginModal/selectors";
import {EMOJIS, FAVORITES, OPEN_GROUPS} from "./constants";

const selectEmojis = () => createSelector(
  selectSession(),
  (session) => session.get(EMOJIS) || fromJS({})
);

const selectFavoriteEmojis = () => createSelector(
  selectEmojis(),
  (emojis) => emojis.get(FAVORITES) || fromJS({})
);

/* Select the 20 most used emojis in descending order. */
export const selectFavEmojis = () => createSelector(
  selectFavoriteEmojis(),
  (faves) => {
    const sorted = faves.sort((a, b) => {
      if (a > b) { return -1; }
      if (a < b) { return 1; }
      if (a === b) { return 0; }
    }).keySeq();
    if (sorted.count() > 20)
      return sorted.slice(0, 20).toJS();
    return sorted.toJS();
  }
);

export const selectOpenEmojiGroups = () => createSelector(
  selectEmojis(),
  (emojis) => emojis.get(OPEN_GROUPS) || fromJS([])
);
