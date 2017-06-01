import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import messages from "./messages";
import {TextField, IconMenu, IconButton, MenuItem} from "material-ui";
import LockIcon from "material-ui/svg-icons/action/lock-open";
import KeyIcon from "material-ui/svg-icons/communication/vpn-key";
import MenuIcon from "material-ui/svg-icons/navigation/more-vert";
import SendIcon from "material-ui/svg-icons/content/send";
import {changeMessage} from "./actions";
import {selectCurrentInput} from "./selectors";
import {createStructuredSelector} from "reselect";
import {selectCurrentThreadID} from "../LoginModal/selectors";
import {selectAutoText} from "../AutoText/selectors";
import muiThemeable from "material-ui/styles/muiThemeable";
import {INPUT_ID} from "./constants";
import {deleteMessages} from "../ThreadHistory/actions";
import {disableEncryption, encryptMessage, sendPublicKey} from "../KeyManager/actions";
import {selectIsCurrentThreadEncrypted} from "../KeyManager/selectors";

/*
A toolbar to send messages aswell as enable/disable encryption.
Also includes a menu button for actions related to the current conversation,
e.g. deleting selected messages or uploading/recording audio/video/image files (yet to come).
*/
export class MessageInput extends React.PureComponent {

  styles = {
    input: {
      width: "calc(100% - 144px)",
    },
  };

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
          style={this.styles.input}
        />
        <IconButton
          onTouchTap={this.props.sendMessage}
          iconStyle={{color: this.props.muiTheme.palette.primary1Color}}>
          <SendIcon/>
        </IconButton>
        <IconButton
          onTouchTap={this.props.isEncrypted ? this.props.disableEncryption : this.props.sendPublicKey}
          iconStyle={{color: this.props.muiTheme.palette.primary1Color}}
        >
          {this.props.isEncrypted ? <LockIcon/> : <KeyIcon/>}
        </IconButton>
        <IconMenu
          iconButtonElement={<IconButton><MenuIcon/></IconButton>}
          anchorOrigin={{horizontal: "right", vertical: "bottom"}}
          targetOrigin={{horizontal: "right", vertical: "bottom"}}
          iconStyle={{color: this.props.muiTheme.palette.primary1Color}}
        >
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
  message: React.PropTypes.string,
  threadID: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  threadID: selectCurrentThreadID(),
  message: selectCurrentInput(),
  abbrs: selectAutoText(),
  isEncrypted: selectIsCurrentThreadEncrypted(),
});

const mergeProps = (stateProps, {dispatch}) => {
  const {threadID, message, abbrs, isEncrypted} = stateProps;

  return {
    threadID,
    message,
    isEncrypted,
    /* Replaces autotext with their full forms. */
    handleChange: (event) => {
      let str = event.target.value;
      abbrs.forEach((text, abbr) => {
        str = str.replace(abbr, text);
      });
      dispatch(changeMessage(str));
    },
    /* Send messages using the return key. */
    handleKeyUp: (event) => {
      if (event.keyCode === 13) {
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
