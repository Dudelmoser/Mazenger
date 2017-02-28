import {createSelector} from "reselect";
import {selectRoot} from "../App/selectors";
import {EMOJIS, FAVORITES, OPEN_GROUPS} from "../App/state";
import {fromJS} from "immutable";

function getKeysSortedByValue(obj) {
  var keys = Object.keys(obj);
  return keys.sort((a,b) => obj[b] - obj[a]);
}

const selectEmojis = () => createSelector(
  selectRoot(),
  (root) => root.get(EMOJIS) || fromJS({})
);

const selectFavoriteEmojis = () => createSelector(
  selectEmojis(),
  (emojis) => emojis.get(FAVORITES) || fromJS({})
);

const selectFavEmojis = () => createSelector(
  selectFavoriteEmojis(),
  (faves) => {
    const sorted = faves.sort((a, b) => {
      if (a < b) { return -1; }
      if (a > b) { return 1; }
      if (a === b) { return 0; }
    }).keySeq();
    if (sorted.count() > 20)
      return sorted.slice(0, 20).toJS();
    return sorted.toJS();
  }
);

const selectOpenEmojiGroups = () => createSelector(
  selectEmojis(),
  (emojis) => emojis.get(OPEN_GROUPS) || fromJS({})
);

export {
  selectEmojis,
  selectFavEmojis,
  selectOpenEmojiGroups,
}
