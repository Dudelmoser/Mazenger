import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectRoot} from "../App/selectors";
import {FRIENDS} from "./constants";

const selectFriends = () => createSelector(
  selectRoot(),
  (root) => root.get(FRIENDS) || fromJS({})
);

const selectFriendsCount = () => createSelector(
  selectFriends(),
  (friends) => friends.count()
);

export {
  selectFriends,
  selectFriendsCount,
};
