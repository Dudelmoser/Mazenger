import {createSelector} from "reselect";
import {ACCENT_COLOR, BACKGROUND_COLOR} from "./constants";
import {fromJS} from "immutable";
import {selectMySettings} from "../SettingsTab/selectors";

export const backgroundColors = fromJS([
  ["#202326", 0],
  ["#383745", 2],
  ["#6c7a89", 2],
  ["#7d7870", 2],
  ["#fffdf7", 1],
  ["#ffffff", 1],
])

export const accentColors = fromJS([
  [
    "#e1ff00",
    "#ffe6a8",
    "#64ffda",
    "#84ffff",
    "#ffcddc",
    "#ececec",
  ],[
    "#c0ca33",
    "#EBBD63",
    "#00b5b5",
    "#00bcd4",
    "#d2527f",
    "#444444",
  ],[
    "#fffdf7",
  ],
]);

const selectBackgroundKey = () => createSelector(
  selectMySettings(),
  (settings) => settings.get(BACKGROUND_COLOR) || 0
);

const selectAccentKey = () => createSelector(
  selectMySettings(),
  (settings) => settings.get(ACCENT_COLOR) || 0
);

const selectBackgroundColors = () => createSelector(
  () => backgroundColors.map(color => color.get(0))
);

const selectBackgroundColor = () => createSelector(
  selectBackgroundColors(),
  selectBackgroundKey(),
  (colors, idx) => colors.get(idx) || "rgb(32, 35, 38)"
);

const selectPaletteKey = () => createSelector(
  selectBackgroundKey(),
  (idx) => {
    const bg = backgroundColors.get(idx);
    if (!bg)
      return 0;
    return bg.get(1);
  }
);

const selectAccentColors = () => createSelector(
  selectPaletteKey(),
  (palette) => accentColors.get(palette) || fromJS([])
);

const selectAccentColor = () => createSelector(
  selectAccentColors(),
  selectAccentKey(),
  (colors, idx) => colors.get(idx) || colors.get(0) || "rgb(225, 255, 0)"
);

export {
  selectAccentColor,
  selectBackgroundColor,
  selectAccentColors,
  selectBackgroundColors,
  selectAccentKey,
  selectBackgroundKey,
}
