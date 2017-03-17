import getMuiTheme from "material-ui/styles/getMuiTheme";
import {lighten, darken, emphasize, fade} from "material-ui/utils/colorManipulator";
import {transparent, fullBlack} from "material-ui/styles/colors";

function createTheme(accentColor, backgroundColor) {
  const warningColor = "#D64541";

  // minimum color difference
  const minDelta = .03;
  const darkerBg = darken(backgroundColor, minDelta);
  const lighterBg = lighten(backgroundColor, minDelta);
  const minDeltaColor = emphasize(backgroundColor, minDelta);

  // other differences to the bg color
  const subtleDeltaColor = emphasize(backgroundColor, .1);
  const distinctDeltaColor = emphasize(backgroundColor, .3);
  const mediumDeltaColor = emphasize(backgroundColor, .6);
  const strongDeltaColor = emphasize(backgroundColor, .9);
  const overlayColor = fade(darken(backgroundColor, 0.1), 0.9);

  // base theme using the previously defined color variations
  return getMuiTheme({
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
    },
    tabs: {
      backgroundColor: transparent,
      textColor: distinctDeltaColor,
      selectedTextColor: accentColor,
    },
    drawer: {
      color: lighterBg,
    },
    message: {
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
      secondaryColor: warningColor,
    },
    flatButton: {
      secondaryTextColor: warningColor,
    },
  });
}

export default createTheme;
