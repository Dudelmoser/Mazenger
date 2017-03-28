import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {createStructuredSelector} from "reselect";
import Tooltip from "react-tooltip";

// components
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {CenterDiv, ContainerDiv, TitleDiv, ThreadDiv, MessageDiv, threadHeight} from "./components";

// containers
import LeftDrawer from "../LeftDrawer";
import RightDrawer from "../RightDrawer";
import ThreadHistory from "../ThreadHistory";
import MessageInput from "../MessageInput";
import LoginModal from "../LoginModal";

// constants
import createTheme from "./theme";
import {selectAccentColor, selectBackgroundColor} from "../ThemeSettings/selectors";

class Messenger extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
        <MuiThemeProvider muiTheme={createTheme(this.props.accentColor, this.props.backgroundColor)}>
          <ContainerDiv>
            <Tooltip id="ttleft" place="left" effect="solid" class="tooltip"/>
            <Tooltip id="ttright" place="right" effect="solid" class="tooltip"/>

            <LoginModal/>
            <LeftDrawer/>

            <CenterDiv>
              <TitleDiv>
                mazenger
              </TitleDiv>
              <ThreadDiv>
                <ThreadHistory/>
              </ThreadDiv>
              <MessageDiv>
                <MessageInput/>
              </MessageDiv>
            </CenterDiv>

            <RightDrawer/>
        </ContainerDiv>
      </MuiThemeProvider>
    );
  }
}

Messenger.propTypes = {
  intl: intlShape.isRequired,
}

const mapStateToProps = createStructuredSelector({
  accentColor: selectAccentColor(),
  backgroundColor: selectBackgroundColor(),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Messenger));
