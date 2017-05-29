import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {createStructuredSelector} from "reselect";

// components
import {Tabs, Tab, Drawer} from "material-ui";
import {Scrollbars} from "react-custom-scrollbars";

// constants
import messages from "./messages";
import {barHeight, tabBtnStyle} from "../App/components";

// icons
import SocialMood from "material-ui/svg-icons/social/mood";
import ImagePortrait from "material-ui/svg-icons/image/portrait";
import ContentReplyAll from "material-ui/svg-icons/content/reply-all";
import ActionPowerSettingsNew from "material-ui/svg-icons/action/power-settings-new";

// containers
import EmojisTab from "../EmojisTab";
import MemesTab from "../MemesTab";
import ChatbotTab from "../ChatbotTab";

// actions
import {logout} from "../App/actions/requests";
import {selectActiveTabRight} from "./selectors";
import {changeRightTab} from "./actions";


class RightDrawer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  LOGOUT_BTN = "logoutBtn";

  componentDidMount() {
    document.getElementById(this.LOGOUT_BTN).onmouseup = this.props.logout;
  }

  componentDidUpdate() {
    document.getElementById(this.LOGOUT_BTN).onmouseup = this.props.logout;
  }

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <Drawer
        open={true}
        docked={true}
        width={this.props.width}
        zDepth={0}
        openSecondary={true}>

        <Tabs
          value={this.props.activeTab}
          onChange={this.props.handleTabChange}
        >
          <Tab
            data-tooltip={formatMessage(messages.emojis)}
            icon={<SocialMood/>}
            value={0}
          >
            <Scrollbars
              autoHide={true}
              style={{height: this.props.height - barHeight}}>
              <EmojisTab/>
            </Scrollbars>
          </Tab>

          <Tab
            data-tooltip={formatMessage(messages.memes)}
            icon={<ImagePortrait/>}
            value={1}
          >
            <Scrollbars
              autoHide={true}
              style={{height: this.props.height - barHeight}}>
              <MemesTab/>
            </Scrollbars>
          </Tab>

          <Tab
            data-tooltip={formatMessage(messages.chatbot)}
            icon={<ContentReplyAll/>}
            value={2}
          >
            <ChatbotTab height={this.props.height - barHeight}/>
          </Tab>

          <Tab
            data-tooltip={formatMessage(messages.logout)}
            disabled={true}
            value={3}
            icon={
              <div id={this.LOGOUT_BTN} className="lifted">
                <ActionPowerSettingsNew style={tabBtnStyle}/>
              </div>}
          />
        </Tabs>

      </Drawer>
    );
  }
}

RightDrawer.propTypes = {
  intl: intlShape.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
}

const mapStateToProps = createStructuredSelector({
  activeTab: selectActiveTabRight(),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  handleTabChange: (value) => dispatch(changeRightTab(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RightDrawer));
