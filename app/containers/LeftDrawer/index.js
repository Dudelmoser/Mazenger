import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {createStructuredSelector} from "reselect";

// components
import {Tabs, Tab, Drawer} from "material-ui";
import {Scrollbars} from "react-custom-scrollbars";

// icons
import CommunicationChat from "material-ui/svg-icons/communication/chat";
import SocialPeople from "material-ui/svg-icons/social/people";
import ActionSettings from "material-ui/svg-icons/action/settings";
import ActionDelete from "material-ui/svg-icons/action/delete";

// containers
import ThreadList from "../ThreadList";
import FriendsList from "../FriendsList";

// actions
import {confirmClearCache} from "../App/actions/actions";
import {getThreadList, getFriendsList} from "../App/actions/requests";

// constants
import messages from "./messages";
import {leftDrawerWidth, drawerHeight, tabBtnStyle} from "../App/components";


class LeftDrawer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  CACHE_BTN = "cacheBtn";

  componentDidMount() {
    document.getElementById(this.CACHE_BTN).onmouseup = this.props.confirmClearCache;
  }

  componentDidUpdate() {
    document.getElementById(this.CACHE_BTN).onmouseup = this.props.confirmClearCache;
  }

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <Drawer
        open={true}
        docked={true}
        width={leftDrawerWidth}
        zDepth={0}
        openSecondary={false}>

        <Tabs>
          <Tab
            data-tooltip={formatMessage(messages.chats)}
            icon={<CommunicationChat/>}
            onActive={this.props.getThreadList}>
            <Scrollbars
              autoHide={true}
              style={{height: drawerHeight}}>
              <ThreadList />
            </Scrollbars>
          </Tab>

          <Tab
            data-tooltip={formatMessage(messages.friends)}
            icon={<SocialPeople/>}
            onActive={this.props.getFriendsList}>
            <Scrollbars
              autoHide={true}
              style={{height: drawerHeight}}>
              <FriendsList />
            </Scrollbars>
          </Tab>

          <Tab
            data-tooltip={formatMessage(messages.clearCache)}
            disabled={true}
            icon={
              <div id={this.CACHE_BTN} className="lifted">
                <ActionDelete style={tabBtnStyle}/>
              </div>}
          />

          <Tab
            data-tooltip={formatMessage(messages.settings)}
            icon={<ActionSettings/>}>
          </Tab>
        </Tabs>

      </Drawer>
    );
  }
}

LeftDrawer.propTypes = {
  intl: intlShape.isRequired,
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
  getThreadList: () => dispatch(getThreadList()),
  getFriendsList: (tab) => dispatch(getFriendsList()),
  confirmClearCache: () => dispatch(confirmClearCache()),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LeftDrawer));
