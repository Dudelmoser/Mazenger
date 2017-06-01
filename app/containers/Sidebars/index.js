import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {createStructuredSelector} from "reselect";
import muiThemeable from "material-ui/styles/muiThemeable";
import ChatIcon from "material-ui/svg-icons/communication/chat";
import FriendsIcon from "material-ui/svg-icons/social/people";
import SettingsIcon from "material-ui/svg-icons/action/settings";
import PowerIcon from "material-ui/svg-icons/action/power-settings-new";
import ThreadList from "../ThreadList";
import FriendsList from "../FriendsList";
import Settings from "../Extras";
import {getThreadList, getFriendsList, logout} from "../App/actions/requests";
import messages from "./messages";
import {selectActiveTabLeft} from "./selectors";
import {changeLeftTab} from "./actions";
import {barHeight, tabBtnStyle} from "../App/components";
import Sidebar from "../../components/Sidebar";
import EmojiIcon from "material-ui/svg-icons/social/mood";
import PortraitIcon from "material-ui/svg-icons/image/portrait";
import ReplyIcon from "material-ui/svg-icons/content/reply-all";
import QuoteIcon from "material-ui/svg-icons/editor/format-quote";
import EmojiList from "../EmojiList";
import MemeGenerator from "../MemeGenerator";
import AutoResponder from "../AutoResponder";
import AutoText from "../AutoText";
import {selectActiveTabRight} from "./selectors";
import {changeRightTab} from "./actions";

/*
A wrapper containing the basic messenger features like a chat and friends list plus settings in the left sidebar
and the special tools like a meme generator, autotext dictionary and auto responder on the right.
*/
class Sidebars extends React.Component {

  LOGOUT_BTN = "logoutBtn";

  /* Tabs are made of their content (a container), an icon, a tooltip
  and sometimes have onClick handlers or a scrollbar. */
  leftTabs = [{
    content: <ThreadList/>,
    icon: <ChatIcon/>,
    tooltip: messages.chats,
    scrollbar: true,
    onClick: this.props.getThreadList
  },{
    content: <FriendsList/>,
    icon: <FriendsIcon/>,
    tooltip: messages.friends,
    scrollbar: true,
    onClick: this.props.getFriendsList
  },{
    content: <Settings/>,
    icon: <SettingsIcon/>,
    tooltip: messages.settings,
    scrollbar: true,
  },{
    /*
    Disabled tabs call neither onActive nor onClick, therefore you need a custom button imitating a tab
    aswell as standard onmouseup handlers registered on componentDidMount and componentDidUpdate.
    */
    icon: <div id="logoutBtn" className="lifted"><PowerIcon style={tabBtnStyle}/></div>,
    tooltip: messages.logout,
    onClick: this.props.logout,
    disabled: true,
  }];

  rightTabs = [{
    content: <EmojiList/>,
    icon: <EmojiIcon/>,
    tooltip: messages.emojis,
    scrollbar: true
  },{
    content: <MemeGenerator/>,
    icon: <PortraitIcon/>,
    tooltip: messages.memes,
    scrollbar: true
  },{
    content: <AutoText height={this.props.height - barHeight}/>,
    icon: <QuoteIcon/>,
    tooltip: messages.autotext,
  },{
    content: <AutoResponder height={this.props.height - barHeight}/>,
    icon: <ReplyIcon/>,
    tooltip: messages.autoreply,
  }];

  componentDidMount() {
    document.getElementById(this.LOGOUT_BTN).onmouseup = this.props.logout;
  }

  componentDidUpdate() {
    document.getElementById(this.LOGOUT_BTN).onmouseup = this.props.logout;
  }

  render() {
    return (
      <div>
        <Sidebar
          right={false}
          tabs={this.leftTabs}
          width={this.props.width}
          height={this.props.height}
          activeTab={this.props.leftTab}
          onTabChange={this.props.changeLeftTab}
        />
        <Sidebar
          right={true}
          tabs={this.rightTabs}
          width={this.props.width}
          height={this.props.height}
          activeTab={this.props.rightTab}
          onTabChange={this.props.changeRightTab}
        />
      </div>
    );
  }
}

Sidebars.propTypes = {
  intl: intlShape.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  leftTab: selectActiveTabLeft(),
  rightTab: selectActiveTabRight(),
});

const mapDispatchToProps = (dispatch) => ({
  changeLeftTab: (value) => dispatch(changeLeftTab(value)),
  changeRightTab: (value) => dispatch(changeRightTab(value)),
  getThreadList: () => dispatch(getThreadList()),
  getFriendsList: (tab) => dispatch(getFriendsList()),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(injectIntl(Sidebars)));
