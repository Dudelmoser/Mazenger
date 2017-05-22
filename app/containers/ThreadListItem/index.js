import React from "react";
import {connect} from "react-redux";
import {getThreadHistory} from "../App/actions/requests";
import {selectThreadSnippet, selectThreadTitle, selectThreadImageURL, selectHasAttachment, selectTypersNamesStr,
  selectTypersCount
} from "./selectors";
import {ListItem, Divider, Avatar} from "material-ui";
import emoji from "react-easy-emoji";
import ClipIcon from "material-ui/svg-icons/file/attachment";
import LockIcon from "material-ui/svg-icons/action/lock-outline";
import muiThemeable from "material-ui/styles/muiThemeable";
import messages from "./messages";
import {injectIntl} from "react-intl";
import {selectSymmetricKeys, selectCurrentAESKeys} from "../MessageInput/selectors";

export class ThreadListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {formatMessage} = this.props.intl;

    // can be simplified cause API reveils no typers in group chats
    const typing = this.props.typersCount == 1
      ? formatMessage(messages.isTyping)
      : formatMessage(messages.areTyping);

    const snippet = this.props.snippet
      ? emoji(this.props.snippet)
      : <ClipIcon style={{height: 20}}/>;

    const secondaryText = this.props.typersCount
      ? this.props.typersNames + typing
      : snippet;

    try {
      return (
        <div style={{position: "relative"}}>
          <ListItem
            leftAvatar={<Avatar src={this.props.imageURL}/>}
            rightIcon={this.props.crypted ? <LockIcon/> : null}
            primaryText={this.props.title}
            secondaryText={
              <p style={{width: "90%"}}>{secondaryText}</p>
            }
            secondaryTextLines={1}
            onTouchTap={this.props.onTouch.bind(this, this.props.threadID)}
          />
          <Divider
            inset={false}
            style={{backgroundColor: "rgba(127,127,127,0.2)"}}/>
        </div>
      );
    } catch (err) {
      return null; //meme.js workaround
    }
  }
}

ThreadListItem.propTypes = {
  threadID: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.string]).isRequired,
  onTouch: React.PropTypes.func,
}

const mapStateToProps = (state, props) => ({
  title: selectThreadTitle(props.threadID)(state),
  snippet: selectThreadSnippet(props.threadID)(state),
  imageURL: selectThreadImageURL(props.threadID)(state),
  hasAttachment: selectHasAttachment(props.threadID)(state),
  typersNames: selectTypersNamesStr(props.threadID)(state),
  typersCount: selectTypersCount(props.threadID)(state),
  crypted: selectSymmetricKeys(props.threadID)(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTouch: (threadID) => dispatch(getThreadHistory(threadID))
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(injectIntl(ThreadListItem)));
