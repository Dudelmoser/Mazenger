import {createSelector} from "reselect";
import {selectRoot} from "../App/selectors";
import {SETTINGS, PRIMARY_COLOR, BACKGROUND_COLOR} from "./constants";
import {selectMyUserID} from "../LoginModal/selectors";
import {fromJS} from "immutable";

export const backgroundColors = fromJS([
  ["rgb(32, 35, 38)", 0],
  ["rgb(253, 253, 253)", 1],
  ["#6E5D4B", 2],
  ["#fffdf7", 3],
])

export const primaryColors = fromJS([
  [
    "rgb(225, 255, 0)",
    "rgb(100, 255, 218)",
    "rgb(132, 255, 255)",
    "rgb(255, 128, 171)",
    "rgb(236, 236, 236)",
  ],[
    "rgb(192, 202, 51)",
    "rgb(0, 188, 212)",
    "rgb(210, 82, 127)",
    "rgb(145, 61, 136)",
    "rgb(108, 122, 137)",
  ],[
    "#FFFCE6",
  ],[
    "#344146",
  ]
]);

const selectSettings = () => createSelector(
  selectRoot(),
  (root) => root.get(SETTINGS) || fromJS({})
);

const selectMySettings = () => createSelector(
  selectSettings(),
  selectMyUserID(),
  (settings, userID) => settings.get(userID) || fromJS({})
);

const selectBackgroundIndex = () => createSelector(
  selectMySettings(),
  (settings) => settings.get(BACKGROUND_COLOR) || 0
);

const selectPrimaryIndex = () => createSelector(
  selectMySettings(),
  (settings) => settings.get(PRIMARY_COLOR) || 0
);

const selectBackgroundColors = () => createSelector(
  () => backgroundColors.map(color => color.get(0))
);

const selectBackgroundColor = () => createSelector(
  selectBackgroundColors(),
  selectBackgroundIndex(),
  (colors, idx) => colors.get(idx) || "rgb(32, 35, 38)"
);

const selectPaletteIndex = () => createSelector(
  selectBackgroundIndex(),
  (idx) => {
    const bg = backgroundColors.get(idx);
    if (!bg)
      return 0;
    return bg.get(1);
  }
);

const selectPrimaryColors = () => createSelector(
  selectPaletteIndex(),
  (palette) => primaryColors.get(palette) || fromJS([])
);

const selectPrimaryColor = () => createSelector(
  selectPrimaryColors(),
  selectPrimaryIndex(),
  (colors, idx) => colors.get(idx) || colors.get(0) || "rgb(225, 255, 0)"
);

const selectNextBackgroundIndex = () => createSelector(
  selectBackgroundColors(),
  selectBackgroundIndex(),
  (colors, idx) => {
    const count = colors.count();
    if (++idx >= count)
      idx = 0;
    return idx;
  }
);

const selectNextBackgroundColor = () => createSelector(
  selectNextBackgroundIndex(),
  (idx) => backgroundColors.get(idx, fromJS([])).get(0) || "rgb(253, 253, 253)"
);

export {
  selectSettings,
  selectPrimaryColor,
  selectBackgroundColor,
  selectPrimaryColors,
  selectBackgroundColors,
  selectPrimaryIndex,
  selectBackgroundIndex,
  selectNextBackgroundIndex,
  selectNextBackgroundColor,
}
