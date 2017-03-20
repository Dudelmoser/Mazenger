import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import messages from "./messages";
import {TextField, FlatButton, IconMenu, IconButton, MenuItem} from "material-ui";
import MenuIcon from "material-ui/svg-icons/navigation/more-vert";
import SendIcon from "material-ui/svg-icons/content/send";
import {changeMessage} from "./actions";
import {sendMessage} from "../App/actions/requests";
import {selectCurrentInput} from "./selectors";
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
          style={{width: "calc(100% - 96px)"}}
        />
        <IconButton
          onTouchTap={this.props.sendMessage}>
          <SendIcon/>
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
});

// to get access to stateProps filled by selectors
const mergeProps = (stateProps, {dispatch}) => {
  const {threadID, message, abbrs} = stateProps;

  return {
    threadID,
    message,
    handleChange: (event) => {
      // replace abbreviations with their full forms
      let str = event.target.value;
      abbrs.forEach((text, abbr) => {
        str = str.replace(abbr, text);
      });
      dispatch(changeMessage(str));
    },
    handleKeyUp: (event) => {
      if (event.keyCode == 13) {
        dispatch(sendMessage(threadID, event.target.value))
      }
    },
    sendMessage: () => dispatch(sendMessage(threadID, document.getElementById(INPUT_ID).value)),
    deleteMessages: () => dispatch(deleteMessages()),
  }
};

export default connect(mapStateToProps, null, mergeProps)(muiThemeable()(injectIntl(MessageInput)));
