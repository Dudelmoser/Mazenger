import React from "react";
import {connect} from "react-redux";
import {getThreadHistory} from "../App/actions/requests";
import {selectThreadSnippet, selectThreadTitle, selectThreadImageURL, selectHasAttachment, selectTypersNamesStr,
  selectTypersCount
} from "./selectors";
import {ListItem, Divider, Avatar} from "material-ui";
import emoji from "react-easy-emoji";
import Attachment from 'material-ui/svg-icons/file/attachment';
import muiThemeable from "material-ui/styles/muiThemeable";
import messages from "./messages";
import {injectIntl} from "react-intl";

export class ThreadListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    // Catch react-easy-emoji error when empty string is passed.
    // Usually happens after cleaning the cache.

    const attachBtnStyle = {
      position: "absolute",
      top: 24,
      right: 12,
      color: this.props.muiTheme.palette.secondaryTextColor,
      display: this.props.hasAttachment ? "block" : "none"
    }

    const {formatMessage} = this.props.intl;

    // can be simplified cause API reveils no typers in group chats
    const typing = this.props.typersCount == 1
      ? formatMessage(messages.isTyping)
      : formatMessage(messages.areTyping);

    const snippet = this.props.snippet
      ? emoji(this.props.snippet)
      : formatMessage(messages.attachment);

    const secondaryText = this.props.typersCount
      ? this.props.typersNames + typing
      : snippet;

    try {
      return (
        <div style={{position: "relative"}}>
          <ListItem
            leftAvatar={<Avatar src={this.props.imageURL}/>}
            primaryText={this.props.title}
            secondaryText={
              <p style={{width: "90%"}}>{secondaryText}</p>
            }
            secondaryTextLines={1}
            onTouchTap={this.props.onTouch.bind(this, this.props.threadID)}
          />
          <Attachment style={attachBtnStyle}/>
          <Divider
            inset={false}
            style={{backgroundColor: "rgba(127,127,127,0.2)"}}/>
        </div>
      );
    } catch (err) {
      console.log(err); //meme.js workaround
      return null;
    }
  }
}

ThreadListItem.propTypes = {
  threadID: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.string]).isRequired,
  onTouch: React.PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  title: selectThreadTitle(ownProps.threadID)(state),
  snippet: selectThreadSnippet(ownProps.threadID)(state),
  imageURL: selectThreadImageURL(ownProps.threadID)(state),
  hasAttachment: selectHasAttachment(ownProps.threadID)(state),
  typersNames: selectTypersNamesStr(ownProps.threadID)(state),
  typersCount: selectTypersCount(ownProps.threadID)(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTouch: (threadID) => dispatch(getThreadHistory(threadID))
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(injectIntl(ThreadListItem)));
