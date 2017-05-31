import {createSelector} from "reselect";
import {fromJS, List, Map} from "immutable";
import {HISTORIES, PHOTOS, SHOW_PHOTO_VIEWER, TYPERS} from "./constants";
import {selectCurrentThreadID, selectSession} from "../LoginModal/selectors";
import {selectUsers} from "../ThreadList/selectors";
import {selectGUI} from "../App/selectors";

const selectHistories = () => createSelector(
  selectSession(),
  (session) => session.get(HISTORIES) || fromJS([])
);

export const selectHistory = (threadID) => createSelector(
  selectHistories(),
  (histories) => histories.get(threadID) || List()
);

export const selectCurrentHistory = () => createSelector(
  selectHistories(),
  selectCurrentThreadID(),
  (histories, threadID) => histories.get(threadID) || List()
);

export const selectAllTypers = () => createSelector(
  selectSession(),
  (session) => session.get(TYPERS) || Map()
);

export const selectCurrentTypers = () => createSelector(
  selectAllTypers(),
  selectCurrentThreadID(),
  (typers, threadID) => typers.get(threadID) || Map()
);

export const selectCurrentTypersNames = () => createSelector(
  selectCurrentTypers(),
  selectUsers(),
  (typers, users) => {
    let result = [];
    typers.forEach((timestamp, userID) =>
      result.push(users.get(userID, Map()).get("name")));
    return result;
  }
);

export const selectMessageCount = () => createSelector(
  selectCurrentHistory(),
  (history) => history.count() || 0
);

export const selectOldestTimestamp = () => createSelector(
  selectCurrentHistory(),
  (history) => {
    const first = history.first();
    let timestamp;
    if (first) {
      timestamp = first.get("timestamp");
    } else {
      timestamp = Date.now();
    }
    return timestamp;
  }
);

export const selectPhotoURLs = () => createSelector(
  selectSession(),
  (session) => session.get(PHOTOS) || List()
);

export const selectViewerArray = () => createSelector(
  selectPhotoURLs(),
  (urls) => urls.map(url =>
    ({src: url, alt: ""})
  ).toArray()
);

export const selectIsViewerVisible = () => createSelector(
  selectGUI(),
  (gui) => gui.get(SHOW_PHOTO_VIEWER)
);
