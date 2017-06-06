import {createSelector} from "reselect";
import {ACCENT_COLOR_KEY, BACKGROUND_COLOR_KEY, THEME} from "./constants";
import {fromJS, Map} from "immutable";
import {selectSession} from "../LoginModal/selectors";

/* Background colors marked as dark (0) or light (1). */
export const backgroundColors = fromJS([
  ["#000000", 0],
  ["#212326", 0],
  ["#292933", 0],
  ["#303840", 0],
  // ["#515b66", 0],
  ["#ffffff", 1],
]);

/* Bright accent colors for dark backgrounds and their dark counterparts for light backgrounds. */
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

export const selectTheme = () => createSelector(
  selectSession(),
  (session) => session.get(THEME) || Map()
);

export const selectBackgroundKey = () => createSelector(
  selectTheme(),
  (theme) => {
    const color = theme.get(BACKGROUND_COLOR_KEY);
    return color !== undefined ? color : 1            // No pipe operator cause 0 would be falsey
  }
);

export const selectAccentKey = () => createSelector(
  selectTheme(),
  (settings) => {
    const color = settings.get(ACCENT_COLOR_KEY);
    return color !== undefined ? color : 2           // No pipe operator cause 0 would be falsey
  }
);

export const selectBackgroundColors = () => createSelector(
  () => backgroundColors.map(color => color.get(0))
);

export const selectBackgroundColor = () => createSelector(
  selectBackgroundColors(),
  selectBackgroundKey(),
  (colors, idx) => colors.get(idx) || colors.get(0)
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

export const selectAccentColors = () => createSelector(
  selectPaletteKey(),
  (palette) => accentColors.get(palette) || fromJS([])
);

export const selectAccentColor = () => createSelector(
  selectAccentColors(),
  selectAccentKey(),
  (colors, idx) => colors.get(idx) || colors.get(0) || "rgb(225, 255, 0)" // Should be redundant
);
