import {createSelector} from "reselect";
import {ACCENT_COLOR, BACKGROUND_COLOR} from "./constants";
import {fromJS} from "immutable";
import {selectSettings} from "../SettingsTab/selectors";

export const backgroundColors = fromJS([
  ["#212326", 0],
  ["#292933", 0],
  ["#303840", 0],
  ["#515b66", 0],
  ["#ffffff", 1],
])

export const accentColors = fromJS([
  [
    "#66ffff",
    "#66ffcc",
    "#e1ff00",
    "#ffcddc",
    "#ececec",
  ],[
    "#245f78",
    "#1BA39C",
    "#9E9D24",
    "#d2527f",
    "#444444",
  ]
]);

const selectBackgroundKey = () => createSelector(
  selectSettings(),
  (settings) => {
    const color = settings.get(BACKGROUND_COLOR);
    return color != undefined ? color : 0
  }
);

const selectAccentKey = () => createSelector(
  selectSettings(),
  (settings) => {
    const color = settings.get(ACCENT_COLOR);
    return color != undefined ? color : 2
  }
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
