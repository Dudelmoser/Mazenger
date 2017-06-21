import React from "react";
import {connect} from "react-redux";
import {getThreadHistory} from "../../App/actions/requests";
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
import {selectIsEncrypted} from "../../KeyManager/selectors";
import {selectCurrentThreadID} from "../../LoginModal/selectors";
/*
A thread list item showing the name and photo of the participant(s), a short text snippet and the encryption status.
*/
export class ThreadListItem extends React.Component {

  /* Add Alt+{1-9} shortcuts to the thread list items. */
  handleKeyUp = (evt) => {
    if (evt.altKey && evt.keyCode - this.props.id === 49) {
      this.props.onTouch(this.props.threadID);
    }
    return false;
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  render() {
    const {formatMessage} = this.props.intl;

    /*
    Can be simplified cause API reveils no typers in group chats.
    TODO: Recognize if someone's typing for too long to be true and wait for reconfirmation of his status.
    */
    const typing = this.props.typersCount === 1
      ? formatMessage(messages.isTyping)
      : formatMessage(messages.areTyping);

    const snippet = this.props.snippet
      ? emoji(this.props.snippet)
      : <ClipIcon
          style={{height: 20}}
          color={this.props.muiTheme.palette.secondaryTextColor}
        />;

    const secondaryText = this.props.typersCount
      ? this.props.typersNames + typing
      : snippet;

    try {
      /* TODO: Give group chats a special avatar. */
      return (
        <div style={{position: "relative"}}>
          <ListItem
            leftAvatar={<Avatar src={this.props.imageURL}/>}
            rightIcon={this.props.isEncrypted ? <LockIcon/> : null}
            primaryText={this.props.title}
            secondaryText={
              <p style={{width: "90%"}}>{secondaryText}</p>
            }
            secondaryTextLines={1}
            style={{color: this.props.threadID == this.props.currentThread
              ? this.props.muiTheme.palette.primary1Color
              : this.props.muiTheme.palette.textColor}}
            onClick={this.props.onTouch.bind(this, this.props.threadID)}
          />
          <Divider
            inset={false}
            style={{backgroundColor: this.props.muiTheme.palette.borderColor}}/>
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
};

const mapStateToProps = (state, props) => ({
  title: selectThreadTitle(props.threadID)(state),
  snippet: selectThreadSnippet(props.threadID)(state),
  imageURL: selectThreadImageURL(props.threadID)(state),
  hasAttachment: selectHasAttachment(props.threadID)(state),
  typersNames: selectTypersNamesStr(props.threadID)(state),
  typersCount: selectTypersCount(props.threadID)(state),
  isEncrypted: selectIsEncrypted(props.threadID)(state),
  currentThread: selectCurrentThreadID()(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTouch: (threadID) => {
    dispatch(getThreadHistory(threadID));
    document.getElementById("input").focus();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(injectIntl(ThreadListItem)));
