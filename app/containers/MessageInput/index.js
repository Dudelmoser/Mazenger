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

export class MessageInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <TextField
        id="input"
        style={this.style}
        value={this.props.message}
        fullWidth={true}
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
});

// to get access to stateProps filled by selectors
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {threadID, message} = stateProps;
  const {dispatch} = dispatchProps;

  return {
    threadID,
    message,
    handleChange: (event) => {
      dispatch(changeMessage(event.target.value));
    },
    handleKeyUp: (event) => {
      if (event.keyCode == 13) {
        dispatch(sendMessage(threadID, event.target.value))
      }
    }
  }
};

export default connect(mapStateToProps, null, mergeProps)(injectIntl(MessageInput));
