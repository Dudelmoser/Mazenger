import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {createStructuredSelector} from "reselect";
import Tooltip from "react-tooltip";
import Viewer from "react-viewer";
import "react-viewer/dist/index.css";
import {closePhoto} from "../App/actions/actions";

// components
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  CenterDiv, ContainerDiv, TitleDiv, ThreadDiv, MessageDiv, drawerWidthPerc, barHeight
} from "./components";

// containers
import LeftDrawer from "../LeftDrawer";
import RightDrawer from "../RightDrawer";
import ThreadHistory from "../ThreadHistory";
import MessageInput from "../MessageInput";
import LoginModal from "../LoginModal";

// constants
import createTheme from "./theme";
import {selectAccentColor, selectBackgroundColor} from "../ThemeSettings/selectors";
import {selectIsPhotoVisible, selectPhotoArray} from "../SettingsTab/selectors";

class Messenger extends React.Component {

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const drawerWidth = this.state.width * drawerWidthPerc;
    const threadWidth = this.state.width - 2 * drawerWidth;

    return (
        <MuiThemeProvider muiTheme={createTheme(this.props.accentColor, this.props.backgroundColor)}>
          <ContainerDiv>
            <LoginModal/>
            <Tooltip id="ttleft" place="left" effect="solid" class="tooltip"/>
            <Tooltip id="ttright" place="right" effect="solid" class="tooltip"/>

            <LeftDrawer height={this.state.height} width={drawerWidth}/>
            <CenterDiv left={drawerWidth} width={threadWidth}>
              <TitleDiv height={barHeight}>
                <Viewer
                  visible={this.props.isPhotoVisible}
                  onClose={this.props.closePhoto}
                  images={this.props.photoArray}
                />
                mazenger
              </TitleDiv>
              <ThreadDiv width={threadWidth}>
                <ThreadHistory/>
              </ThreadDiv>
              <MessageDiv left={barHeight}>
                <MessageInput/>
              </MessageDiv>
            </CenterDiv>
            <RightDrawer height={this.state.height} width={drawerWidth}/>

        </ContainerDiv>
      </MuiThemeProvider>
    );
  }
}

Messenger.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  accentColor: selectAccentColor(),
  backgroundColor: selectBackgroundColor(),
  photoArray: selectPhotoArray(),
  isPhotoVisible: selectIsPhotoVisible(),
});

const mapDispatchToProps = (dispatch) => ({
  closePhoto: () => dispatch(closePhoto())
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Messenger));
