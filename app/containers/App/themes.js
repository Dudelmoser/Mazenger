import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from "material-ui/utils/colorManipulator";
import {fullBlack} from "material-ui/styles/colors";
import {darkBlack} from "material-ui/styles/colors";
import {cyan500} from "material-ui/styles/colors";
import {grey300} from "material-ui/styles/colors";
import {cyan700} from "material-ui/styles/colors";
import {grey400} from "material-ui/styles/colors";
import {pinkA200} from "material-ui/styles/colors";
import {grey100} from "material-ui/styles/colors";
import {grey500} from "material-ui/styles/colors";
import {white} from "material-ui/styles/colors";
import {grey600} from "material-ui/styles/colors";
import {pinkA400} from "material-ui/styles/colors";
import {pinkA100} from "material-ui/styles/colors";
import {fullWhite} from "material-ui/styles/colors";
import {limeA400} from "material-ui/styles/colors";
import {limeA700} from "material-ui/styles/colors";

const darkPalette = {
  primary1Color: limeA700,
  primary2Color: cyan700,
  primary3Color: grey600,
  accent1Color: limeA400,
  accent2Color: pinkA400,
  accent3Color: pinkA100,
  textColor: fullWhite ,
  secondaryTextColor: fade(fullWhite, 0.7),
  alternateTextColor: '#303030',
  canvasColor: '#202326',
  borderColor: fade(fullWhite, 0.3),
  disabledColor: fade(fullWhite, 0.3),
  pickerHeaderColor: fade(fullWhite, 0.12),
  clockCircleColor: fade(fullWhite, 0.12),
  shadowColor: fullBlack,
};

const darkTheme = getMuiTheme({
  palette: darkPalette,
  tabs: {
    backgroundColor: "transparent",
    textColor: fade(fullWhite, 0.7),
    selectedTextColor: limeA400
  },
  container: {
    background: "#202326"
  },
  center: {
    background: "#202326"
  },
});

const lightTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: (0, fade)(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: (0, fade)(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: (0, fade)(darkBlack, 0.07),
    shadowColor: fullBlack,
    background: fullWhite
  }
});

export {
  darkTheme,
  lightTheme,
  darkPalette,
}