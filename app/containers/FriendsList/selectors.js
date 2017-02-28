import {createSelector} from "reselect";
import {selectUsers} from "../App/selectors";
import {FRIENDS} from "../App/state";
import {fromJS} from "immutable";

const selectFriends = () => createSelector(
  selectUsers(),
  (users) => users.get(FRIENDS) || fromJS({})
);

const selectFriendsCount = () => createSelector(
  selectFriends(),
  (friends) => friends.count()
);

export {
  selectFriends,
  selectFriendsCount,
};
