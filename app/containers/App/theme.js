import getMuiTheme from "material-ui/styles/getMuiTheme";
import {lighten, darken, emphasize, fade} from "material-ui/utils/colorManipulator";
import {transparent, fullBlack} from "material-ui/styles/colors";

export default function createTheme(accentColor, backgroundColor) {
  const warningColor = "#D64541";

  /* Minimum color difference */
  const minDelta = .03;
  const darkerBg = darken(backgroundColor, minDelta);
  const lighterBg = lighten(backgroundColor, minDelta);
  const minDeltaColor = emphasize(backgroundColor, minDelta);

  /* Other differences to the bg color */
  const subtleDeltaColor = emphasize(backgroundColor, .1);
  const distinctDeltaColor = emphasize(backgroundColor, .3);
  const mediumDeltaColor = emphasize(backgroundColor, .6);
  const strongDeltaColor = emphasize(backgroundColor, .9);
  const overlayColor = fade(darken(backgroundColor, 0.1), 0.9);

  /* Base theme using the previously defined color variations */
  return getMuiTheme({
    fontFamily: "Source Sans Pro",
    palette: {
      primary1Color: accentColor,                           // most focused/selected elements and appbar/tabs
      primary2Color: accentColor,                           // date/time picker selection & header
      primary3Color: distinctDeltaColor,                    // inactive slider, toggle track
      accent1Color: accentColor,                            // snackbar action, button (2nd), badge (2nd)
      accent2Color: subtleDeltaColor,                       // toolbar bg, toggle off, table hover
      accent3Color: mediumDeltaColor,                       // table header & footer, active slider
      textColor: strongDeltaColor,                          // most text
      secondaryTextColor: mediumDeltaColor,                 // list items secondary text
      alternateTextColor: backgroundColor,                  // text on primary colored elements
      canvasColor: darkerBg,                                // background for drawer, images etc.
      shadowColor: fullBlack,
      borderColor: subtleDeltaColor,
      disabledColor: distinctDeltaColor,
      clockCircleColor: minDeltaColor,
      semitrans: fade(darkerBg, 0.95),
      warningColor: warningColor,
    },
    tabs: {
      backgroundColor: transparent,
      textColor: distinctDeltaColor,
      selectedTextColor: accentColor,
    },
    drawer: {
      color: lighterBg,
    },
    table: {
      backgroundColor: lighterBg,
    },
    overlay: {
      backgroundColor: overlayColor,
    },
    listItem: {
      leftIconColor: distinctDeltaColor,
      rightIconColor: distinctDeltaColor,
    },
    stepper: {
      textColor: mediumDeltaColor,
    },
    checkbox: {
      boxColor: distinctDeltaColor,
    },
    raisedButton: {
      fontWeight: 600,
      secondaryColor: warningColor,
    },
    flatButton: {
      secondaryTextColor: warningColor,
    },
    message: {
      color: lighterBg,
    },
  });
}
