import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {createStructuredSelector} from "reselect";
import Tooltip from "react-tooltip";

// components
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Scrollbars} from "react-custom-scrollbars";
import {CenterDiv, ContainerDiv, TitleDiv, ThreadDiv, MessageDiv, threadHeight} from "./components";

// containers
import LeftDrawer from "../LeftDrawer";
import RightDrawer from "../RightDrawer";
import ThreadHistory from "../ThreadHistory";
import MessageInput from "../MessageInput";
import LoginModal from "../LoginModal";

// constants
import messages from './messages';
import {darkTheme} from "./themes";

class Messenger extends React.Component { // eslint-disable-line react/prefer-stateless-function

  scrollToBottom() {
    if (this.refs)
      this.refs.scrollbar.scrollToBottom();
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
        <MuiThemeProvider muiTheme={darkTheme}>
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
                <Scrollbars
                  ref="scrollbar"
                  autoHide={true}
                  style={{height: threadHeight}}>
                  <ThreadHistory onUpdate={this.scrollToBottom.bind(this)}/>
                </Scrollbars>
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

  componentDidMount() {
    this.scrollToBottom.bind(this)();
  }
}

Messenger.propTypes = {
  intl: intlShape.isRequired,
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Messenger));
