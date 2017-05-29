import {selectSession} from "../LoginModal/selectors";
import {createSelector} from "reselect";
import {fromJS, Map, List} from "immutable";
import {IS_PHOTO_VISIBLE, PHOTO_URLS, SETTINGS} from "./constants";

export const selectSettings = () => createSelector(
  selectSession(),
  (session) => session.get(SETTINGS) || Map()
);

export const selectPhotoURLs = () => createSelector(
  selectSettings(),
  (settings) => settings.get(PHOTO_URLS) || List()
);

export const selectPhotoArray = () => createSelector(
  selectPhotoURLs(),
  (urls) => urls.map(url =>
    ({src: url, alt: ""})
  ).toArray()
);

export const selectIsPhotoVisible = () => createSelector(
  selectSettings(),
  (settings) => settings.get(IS_PHOTO_VISIBLE)
);
