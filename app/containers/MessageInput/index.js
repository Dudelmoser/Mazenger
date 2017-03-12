import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import messages from "./messages";
import {TextField} from "material-ui";
import {changeMessage} from "./actions";
import {sendMessage} from "../App/actions/requests";
import {selectCurrentInput} from "./selectors";
import {createStructuredSelector} from "reselect";
import {selectCurrentThreadID} from "../LoginModal/selectors";
import {selectAbbreviations} from "../AbbreviationsTab/selectors";

export class MessageInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <TextField
        id="input"
        fullWidth={true}
        value={this.props.message}
        onKeyUp={this.props.handleKeyUp}
        onChange={this.props.handleChange}
        hintText={formatMessage(messages.hint)}
      />
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
    }
  }
};

export default connect(mapStateToProps, null, mergeProps)(injectIntl(MessageInput));
