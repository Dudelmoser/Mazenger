import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {lighten, darken, emphasize, fade} from "material-ui/utils/colorManipulator";
import {transparent, fullBlack} from "material-ui/styles/colors";

function createTheme(accentColor, backgroundColor) {
  return getMuiTheme({
    palette: {
      primary1Color: accentColor,                           // most focused/selected elements and appbar/tabs
      primary2Color: accentColor,                           // date/time picker selection & header
      primary3Color: emphasize(backgroundColor, .3),        // inactive slider, toggle track
      accent1Color: accentColor,                            // snackbar action, button (2nd), badge (2nd)
      accent2Color: emphasize(backgroundColor, .1),         // toolbar bg, toggle off, table hover
      accent3Color: emphasize(backgroundColor, .5),         // table header & footer, active slider
      textColor: emphasize(backgroundColor, .9),            // most text
      secondaryTextColor: emphasize(backgroundColor,.6),    // list items secondary text
      alternateTextColor: backgroundColor,                  // text on primary colored elements
      canvasColor: darken(backgroundColor, .03),            // background for drawer, images etc.
      shadowColor: fullBlack,
      borderColor: emphasize(backgroundColor, .1),
      disabledColor: emphasize(backgroundColor, .4),
      clockCircleColor: emphasize(backgroundColor, .03),
    },
    tabs: {
      backgroundColor: transparent,
      textColor: emphasize(backgroundColor, 0.3),
      selectedTextColor: accentColor,
    },
    drawer: {
      color: lighten(backgroundColor, 0.03),
    },
    message: {
      color: lighten(backgroundColor, 0.03),
    },
    overlay: {
      backgroundColor: fade(darken(backgroundColor, 0.1), 0.9),
    },
    listItem: {
      leftIconColor: emphasize(backgroundColor, .3),
      rightIconColor: emphasize(backgroundColor, .3),
    },
    stepper: {
      textColor: emphasize(backgroundColor, .9),
    },
    table: {
      backgroundColor: lighten(backgroundColor, 0.03),
    },
    raisedButton: {
      secondaryColor: "#D64541",
    },
    flatButton: {
      secondaryTextColor: "#D64541",
    },
    checkbox: {
      boxColor: emphasize(backgroundColor, .3),
    }
  });
}

export default createTheme;
