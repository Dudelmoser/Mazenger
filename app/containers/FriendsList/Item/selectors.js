import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectFriends} from "../selectors";

const selectFriend = (index) => createSelector(
  selectFriends(),
  (friends) => friends.get(index) || fromJS({})
);

export const selectImageURL = (index) => createSelector(
  selectFriend(index),
  (friend) => friend.get("profilePicture") || ""
);

export const selectFullName = (index) => createSelector(
  selectFriend(index),
  (friend) => friend.get("fullName") || ""
);

export const selectHasBirthday = (index) => createSelector(
  selectFriend(index),
  (friend) => friend.get("isBirthday") || false
);

export const selectProfileURL = (index) => createSelector(
  selectFriend(index),
  (friend) => friend.get("profileUrl") || ""
);

export const selectUserID = (index) => createSelector(
  selectFriend(index),
  (friend) => friend.get("userID") || ""
);
