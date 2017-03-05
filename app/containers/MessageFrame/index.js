import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from 'react-intl';
import {selectMessage, selectTimeStamp, selectIsOwn, selectIsSequel, selectTimePassed, selectSenderName,
  selectAttachmentsCount, selectMessageBody
} from "./selectors";
import {messageSelected} from "./actions";
import {fromJS} from "immutable";
import Message from "../../components/Message";
import Timestamp from "../../components/Timestamp";
import {resolvePhotoUrl} from "../App/actions/requests";
import Tooltip from "react-tooltip";

export class MessageFrame extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  maxTimeSpan = 5; // in minutes

  wrapperStyle = {
    display: "flex",
    flexDirection: "column"
  };

  getReaders() {
    const count = this.props.message.get("readers", fromJS([])).count();
    if (!count)
      return;
    return <span>✓<sup>{count}</sup></span>
  }

  render() {
    const divStyle = {
      overflow: "hidden",
      margin: "0.5em",
      marginBottom: "0",
      lineHeight: "32px",
      minHeight: "32px",
      alignSelf: this.props.isOwn ? "flex-end" : "flex-start",
    };

    if (!this.props.messageBody && !this.props.attachmentsCount) {
      return null;
    }
    return (
      <div style={this.wrapperStyle}>
        <Timestamp
          timestamp={this.props.timestamp}
          condition={this.props.timePassed > this.maxTimeSpan * 60000}/>
        <div
          style={divStyle}
          onClick={this.props.onTouch.bind(this, this.props.index, this.props.threadID)}>
          <Message
            message={this.props.message}
            tooltip={this.props.senderName}
            isOwn={this.props.isOwn}
            onClick={this.props.onClickImage}/>
          {this.getReaders()}
        </div>
      </div>
    );
  }

  // tooltip doesn't work reliably without delayed rebuild
  componentDidMount() {
    setTimeout(() => {
      Tooltip.rebuild();
    }, 100)
  }

  componentDidUpdate() {
    setTimeout(() => {
      Tooltip.rebuild();
    }, 100)
  }
}

// optional: type checks only in dev mode
// alternative: TypeScript, SoundScript, Flow
MessageFrame.propTypes = {
  intl: intlShape.isRequired,
  index: React.PropTypes.number.isRequired,
  threadID: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.string]).isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  message: selectMessage(ownProps.index, ownProps.threadID)(state),
  isOwn: selectIsOwn(ownProps.index, ownProps.threadID)(state),
  isSequel: selectIsSequel(ownProps.index, ownProps.threadID)(state),
  timestamp: selectTimeStamp(ownProps.index, ownProps.threadID)(state),
  timePassed: selectTimePassed(ownProps.index, ownProps.threadID)(state),
  senderName: selectSenderName(ownProps.index, ownProps.threadID)(state),
  messageBody: selectMessageBody(ownProps.index, ownProps.threadID)(state),
  attachmentsCount: selectAttachmentsCount(ownProps.index, ownProps.threadID)(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  onTouch: (index, threadID) => dispatch(messageSelected(index, threadID)),
  onClickImage: (photoID) => dispatch(resolvePhotoUrl(photoID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MessageFrame));
