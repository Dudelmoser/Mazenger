import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {selectFriends} from "../FriendsList/selectors";

const selectFriend = (index) => createSelector(
  selectFriends(),
  (friends) => friends.get(index) || fromJS({})
);

const selectImageURL = (index) => createSelector(
  selectFriend(index),
  (friend) => friend.get("profilePicture") || ""
);

const selectFullName = (index) => createSelector(
  selectFriend(index),
  (friend) => friend.get("fullName") || ""
);

const selectHasBirthday = (index) => createSelector(
  selectFriend(index),
  (friend) => friend.get("isBirthday") || false
);

const selectProfileURL = (index) => createSelector(
  selectFriend(index),
  (friend) => friend.get("profileUrl") || ""
);

const selectUserID = (index) => createSelector(
  selectFriend(index),
  (friend) => friend.get("userID") || ""
);

export {
  selectFriend,
  selectImageURL,
  selectFullName,
  selectHasBirthday,
  selectProfileURL,
  selectUserID,
}
