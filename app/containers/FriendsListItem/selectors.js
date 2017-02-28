import {createSelector} from "reselect";
import {selectFriends} from "../FriendsList/selectors";

const selectFriend = (index) => createSelector(
  selectFriends(),
  (friends) => friends.get(index)
);

const selectImageURL = (index) => createSelector(
  selectFriend(index),
  (friend) => friend ? friend.get("profilePicture") : ""
);

const selectFullName = (index) => createSelector(
  selectFriend(index),
  (friend) => friend ? friend.get("fullName") : ""
);

const selectHasBirthday = (index) => createSelector(
  selectFriend(index),
  (friend) => friend ? friend.get("isBirthday") : ""
);

const selectProfileURL = (index) => createSelector(
  selectFriend(index),
  (friend) => friend ? friend.get("profileUrl") : ""
);

const selectUserID = (index) => createSelector(
  selectFriend(index),
  (friend) => friend ? friend.get("userID") : ""
);

export {
  selectFriend,
  selectImageURL,
  selectFullName,
  selectHasBirthday,
  selectProfileURL,
  selectUserID,
}