import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {lighten, darken, emphasize, fade} from "material-ui/utils/colorManipulator";
import {transparent, fullBlack} from "material-ui/styles/colors";

function createTheme(backgroundColor, primaryColor, secondaryColor) {
  if (!secondaryColor)
    secondaryColor = primaryColor;
  return getMuiTheme({
    palette: {
      primary1Color: primaryColor,                          // most focused/selected elements and appbar/tabs
      primary2Color: primaryColor,                          // date/time picker selection & header
      primary3Color: emphasize(backgroundColor, .3),        // inactive slider, toggle track
      accent1Color: secondaryColor,                         // snackbar action, button (2nd), badge (2nd)
      accent2Color: emphasize(backgroundColor, .01),         // toolbar bg, toggle off, table hover
      accent3Color: emphasize(backgroundColor, .5),         // table header & footer, active slider
      textColor: emphasize(backgroundColor, .9),            // most text
      secondaryTextColor: emphasize(backgroundColor,.6),    // list items secondary text
      alternateTextColor: backgroundColor,                  // text on primary colored elements
      canvasColor: darken(backgroundColor, .02),            // background for drawer, images etc.
      shadowColor: fullBlack,
      borderColor: emphasize(backgroundColor, .1),
      disabledColor: emphasize(backgroundColor, .4),
      clockCircleColor: emphasize(backgroundColor, .02),
    },
    tabs: {
      backgroundColor: transparent,
      textColor: emphasize(backgroundColor, 0.3),
      selectedTextColor: primaryColor,
    },
    drawer: {
      color: lighten(backgroundColor, 0.01),
    },
    message: {
      color: lighten(backgroundColor, 0.01),
    },
    overlay: {
      backgroundColor: fade(darken(backgroundColor, 0.1), 0.9),
    },
    listItem: {
      leftIconColor: emphasize(backgroundColor, .3)
    }
  });
}

// export default createTheme("rgb(32,35,38)", "rgb(235,255,0)");
export default createTheme("rgb(255,255,255)", "rgb(170,190,0)");
