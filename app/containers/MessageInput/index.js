import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import messages from "./messages";
import {TextField, IconMenu, IconButton, MenuItem} from "material-ui";
import LockIcon from "material-ui/svg-icons/action/lock-open";
import KeyIcon from "material-ui/svg-icons/communication/vpn-key";
import MenuIcon from "material-ui/svg-icons/navigation/more-vert";
import SendIcon from "material-ui/svg-icons/content/send";
import {changeMessage, encryptMessage, disableEncryption, sendPublicKey} from "./actions";
import {selectCurrentInput, selectIsCurrentThreadEncrypted} from "./selectors";
import {createStructuredSelector} from "reselect";
import {selectCurrentThreadID} from "../LoginModal/selectors";
import {selectAbbreviations} from "../AbbreviationsTab/selectors";
import muiThemeable from "material-ui/styles/muiThemeable";
import {INPUT_ID} from "./constants";
import {deleteMessages} from "../ThreadHistory/actions";

export class MessageInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div>
        <TextField
          id={INPUT_ID}
          value={this.props.message}
          onKeyUp={this.props.handleKeyUp}
          onChange={this.props.handleChange}
          hintText={formatMessage(messages.hint)}
          style={{width: "calc(100% - 144px)"}}
        />
        <IconButton
          onTouchTap={this.props.sendMessage}>
          <SendIcon/>
        </IconButton>
        <IconButton
          onTouchTap={this.props.isEncrypted ? this.props.disableEncryption : this.props.sendPublicKey}>
          {this.props.isEncrypted ? <LockIcon/> : <KeyIcon/>}
        </IconButton>
        <IconMenu
          iconButtonElement={<IconButton><MenuIcon/></IconButton>}
          anchorOrigin={{horizontal: "right", vertical: "bottom"}}
          targetOrigin={{horizontal: "right", vertical: "bottom"}}>
          <MenuItem
            primaryText={formatMessage(messages.delete)}
            onTouchTap={this.props.deleteMessages}
          />
        </IconMenu>
      </div>
    );
  }
}

MessageInput.propTypes = {
  intl: intlShape.isRequired,
  threadID: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.string]),
  message: React.PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  threadID: selectCurrentThreadID(),
  message: selectCurrentInput(),
  abbrs: selectAbbreviations(),
  isEncrypted: selectIsCurrentThreadEncrypted(),
});

// to get access to stateProps filled by selectors
const mergeProps = (stateProps, {dispatch}) => {
  const {threadID, message, abbrs, isEncrypted} = stateProps;

  return {
    threadID,
    message,
    isEncrypted,
    // replace abbreviations with their full forms
    handleChange: (event) => {
      let str = event.target.value;
      abbrs.forEach((text, abbr) => {
        str = str.replace(abbr, text);
      });
      dispatch(changeMessage(str));
    },
    // send message with return key
    handleKeyUp: (event) => {
      if (event.keyCode == 13) {
        dispatch(encryptMessage(threadID, event.target.value))
      }
    },
    sendMessage: () => dispatch(encryptMessage(threadID, document.getElementById(INPUT_ID).value)),
    deleteMessages: () => dispatch(deleteMessages()),
    sendPublicKey: () => dispatch(sendPublicKey(threadID)),
    disableEncryption: () => dispatch(disableEncryption(threadID)),
  }
};

export default connect(mapStateToProps, null, mergeProps)(muiThemeable()(injectIntl(MessageInput)));
