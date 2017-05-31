import {createSelector} from "reselect";
import {List} from "immutable";
import {FRIENDS} from "./constants";
import {selectSession} from "../LoginModal/selectors";

export const selectFriends = () => createSelector(
  selectSession(),
  (session) => session.get(FRIENDS) || List()
);

export const selectFriendsCount = () => createSelector(
  selectFriends(),
  (friends) => friends.count()
);
