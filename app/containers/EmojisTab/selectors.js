import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectRoot} from "../App/selectors";
import {selectMyUserID} from "../LoginModal/selectors";
import {EMOJIS, FAVORITES, OPEN_GROUPS} from "./constants";

const selectEmojis = () => createSelector(
  selectRoot(),
  (root) => root.get(EMOJIS) || fromJS({})
);

const selectMyEmojis = () => createSelector(
  selectEmojis(),
  selectMyUserID(),
  (emojis, userID) => emojis.get(userID) || fromJS({})
)

const selectFavoriteEmojis = () => createSelector(
  selectMyEmojis(),
  (emojis) => emojis.get(FAVORITES) || fromJS({})
);

const selectFavEmojis = () => createSelector(
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

const selectOpenEmojiGroups = () => createSelector(
  selectMyEmojis(),
  (emojis) => emojis.get(OPEN_GROUPS) || fromJS({0: true, 1: true})
);

export {
  selectEmojis,
  selectMyEmojis,
  selectFavEmojis,
  selectOpenEmojiGroups,
}
