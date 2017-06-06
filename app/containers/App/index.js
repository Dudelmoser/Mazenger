import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {createStructuredSelector} from "reselect";
import Tooltip from "react-tooltip";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  CenterDiv, ContainerDiv, TitleDiv, ThreadDiv, MessageDiv, drawerWidthPerc, barHeight
} from "./components";
import LeftDrawer from "../Sidebars";
import ThreadHistory from "../ThreadHistory";
import MessageInput from "../MessageInput";
import LoginModal from "../LoginModal";
import createTheme from "./theme";
import {selectAccentColor, selectBackgroundColor} from "../ThemeManager/selectors";

/*
The main application wrapper.
*/
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
                mazenger
              </TitleDiv>
              <ThreadDiv width={threadWidth}>
                <ThreadHistory/>
              </ThreadDiv>
              <MessageDiv left={barHeight}>
                <MessageInput/>
              </MessageDiv>
            </CenterDiv>

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
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Messenger));
