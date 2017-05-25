import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {createStructuredSelector} from "reselect";
import muiThemeable from "material-ui/styles/muiThemeable";

// components
import {Tabs, Tab, Drawer} from "material-ui";
import {Scrollbars} from "react-custom-scrollbars";

// icons
import CommunicationChat from "material-ui/svg-icons/communication/chat";
import SocialPeople from "material-ui/svg-icons/social/people";
import ActionSettings from "material-ui/svg-icons/action/settings";
import EditorFormatQuote from "material-ui/svg-icons/editor/format-quote";

// containers
import ThreadList from "../ThreadList";
import FriendsList from "../FriendsList";
import AbbreviationsTab from "../AbbreviationsTab";
import SettingsTab from "../SettingsTab";

// actions
import {getThreadList, getFriendsList} from "../App/actions/requests";

// constants
import messages from "./messages";
import {leftDrawerWidth, drawerHeight, tabBtnStyle} from "../App/components";
import {selectActiveTabLeft} from "./selectors";
import {changeLeftTab} from "./actions";


class LeftDrawer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <Drawer
        open={true}
        docked={true}
        width={leftDrawerWidth}
        zDepth={0}
        openSecondary={false}>

        <Tabs
          value={this.props.activeTab}
          onChange={this.props.handleTabChange}
        >
          <Tab
            data-tooltip={formatMessage(messages.chats)}
            icon={<CommunicationChat/>}
            onActive={this.props.getThreadList}
            value={0}
          >
            <Scrollbars
              autoHide={true}
              style={{height: drawerHeight}}>
              <ThreadList />
            </Scrollbars>
          </Tab>

          <Tab
            data-tooltip={formatMessage(messages.friends)}
            icon={<SocialPeople/>}
            onActive={this.props.getFriendsList}
            value={1}
          >
            <Scrollbars
              autoHide={true}
              style={{height: drawerHeight}}>
              <FriendsList />
            </Scrollbars>
          </Tab>

          <Tab
            data-tooltip={formatMessage(messages.abbreviations)}
            icon={<EditorFormatQuote/>}
            value={2}
          >
            <AbbreviationsTab />
          </Tab>

          <Tab
            data-tooltip={formatMessage(messages.settings)}
            icon={<ActionSettings/>}
            value={3}
          >
            <Scrollbars
              autoHide={true}
              style={{height: drawerHeight}}>
              <SettingsTab/>
            </Scrollbars>
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
  activeTab: selectActiveTabLeft(),
});

const mapDispatchToProps = (dispatch) => ({
  getThreadList: () => dispatch(getThreadList()),
  getFriendsList: (tab) => dispatch(getFriendsList()),
  handleTabChange: (value) => dispatch(changeLeftTab(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(injectIntl(LeftDrawer)));
