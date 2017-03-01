import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from 'react-intl';
import {selectMessage, selectTimeStamp, selectIsOwn, selectIsSequel, selectTimePassed} from "./selectors";
import {messageSelected} from "./actions";
import {fromJS} from "immutable";
import Message from "../../components/Message";
import Timestamp from "../../components/Timestamp";
import {resolvePhotoUrl} from "../App/actions/requests";

export class MessageFrame extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  maxTimeSpan = 5; // in minutes

  wrapperStyle = {
    display: "flex",
    flexDirection: "column"
  };

  divStyle = {
    overflow: "hidden",
    margin: "0.5em",
    marginBottom: "0",
    lineHeight: "32px",
    minHeight: "32px",
    alignSelf: this.props.isOwn ? "flex-end" : "",
  };

  getReaders() {
    const count = this.props.message.get("readers", fromJS([])).count();
    if (!count)
      return;
    return <span>✓<sup>{count}</sup></span>
  }

  render() {
    if (!this.props.message.get("body") && !this.props.message.get("attachments").count()) {
      return null;
    }
    return (
      <div style={this.wrapperStyle}>
        <Timestamp
          timestamp={this.props.timestamp}
          condition={this.props.timePassed > this.maxTimeSpan * 60000}/>
        <div
          style={this.divStyle}
          onClick={this.props.onTouch.bind(this, this.props.index, this.props.threadID)}>
          <Message
            onClick={this.props.onClickImage}
            message={this.props.message}/>
          {this.getReaders()}
        </div>
      </div>
    );
  }
}

// optional: type checks only in dev mode
// alternative: TypeScript, SoundScript, Flow
MessageFrame.propTypes = {
  intl: intlShape.isRequired,
  index: React.PropTypes.number.isRequired,
  threadID: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.string]).isRequired,
  message: React.PropTypes.object,
  isOwn: React.PropTypes.bool,
  isSequel: React.PropTypes.bool,
  timestamp: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.string]),
  timePassed: React.PropTypes.number,
  onTouch: React.PropTypes.func,
  onClickImage: React.PropTypes.func,
}

const mapStateToProps = (state, props) => ({
  message: selectMessage(props.index, props.threadID)(state),
  isOwn: selectIsOwn(props.index, props.threadID)(state),
  isSequel: selectIsSequel(props.index, props.threadID)(state),
  timestamp: selectTimeStamp(props.index, props.threadID)(state),
  timePassed: selectTimePassed(props.index, props.threadID)(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  onTouch: (index, threadID) => dispatch(messageSelected(index, threadID)),
  onClickImage: (photoID) => dispatch(resolvePhotoUrl(photoID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MessageFrame));
