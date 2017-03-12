import {createSelector} from "reselect";
import {List} from "immutable";
import {FRIENDS} from "./constants";
import {selectSession} from "../LoginModal/selectors";

const selectFriends = () => createSelector(
  selectSession(),
  (session) => session.get(FRIENDS) || List()
);

const selectFriendsCount = () => createSelector(
  selectFriends(),
  (friends) => friends.count()
);

export {
  selectFriends,
  selectFriendsCount,
};
