import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {createStructuredSelector} from "reselect";

// components
import {Tabs, Tab, Drawer} from "material-ui";
import {Scrollbars} from "react-custom-scrollbars";

// constants
import messages from "./messages";
import {rightDrawerWidth, drawerHeight} from "../App/components";

// icons
import SocialMood from "material-ui/svg-icons/social/mood";
import ImagePortrait from "material-ui/svg-icons/image/portrait";
import CommunicationImportExport from "material-ui/svg-icons/communication/import-export";
import ActionPowerSettingsNew from "material-ui/svg-icons/action/power-settings-new";

// containers
import EmojisTab from "../EmojisTab";
import MemesTab from "../MemesTab";

// actions
import {logout} from "../App/actions/requests";


class RightDrawer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  LOGOUT_BTN = "logoutBtn";

  tabBtnStyle = {
    width: "100%",
    cursor: "pointer",
    color: "inherit",
  }

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
        width={rightDrawerWidth}
        zDepth={0}
        openSecondary={true}>

        <Tabs>
          <Tab
            data-tooltip={formatMessage(messages.emojis)}
            icon={<SocialMood/>}>
            <Scrollbars
              autoHide={true}
              style={{height: drawerHeight}}>
              <EmojisTab/>
            </Scrollbars>
          </Tab>

          <Tab
            data-tooltip={formatMessage(messages.memes)}
            icon={<ImagePortrait/>}>
            <Scrollbars
              autoHide={true}
              style={{height: drawerHeight}}>
              <MemesTab/>
            </Scrollbars>
          </Tab>

          <Tab
            data-tooltip={formatMessage(messages.chatbot)}
            icon={<CommunicationImportExport/>}>
          </Tab>

          <Tab
            data-tooltip={formatMessage(messages.logout)}
            disabled={true}
            icon={
              <div id={this.LOGOUT_BTN} className="lifted">
                <ActionPowerSettingsNew style={this.tabBtnStyle}/>
              </div>}
          />
        </Tabs>

      </Drawer>
    );
  }
}

RightDrawer.propTypes = {
  intl: intlShape.isRequired,
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RightDrawer));
