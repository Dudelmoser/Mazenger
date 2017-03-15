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
import {selectBackgroundColor} from "../ThemeSettings/selectors";

export class MessageFrame extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    selected: false
  };

  maxTimeSpan = 5; // in minutes

  wrapperStyle = {
    display: "flex",
    flexDirection: "column"
  };

  onSelect() {
    this.props.onSelect(!this.state.selected);
    this.setState({selected: !this.state.selected});
  }

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
      opacity: this.state.selected ? .5 : 1,
      filter: this.state.selected ? "saturate(20%)" : "none",
      alignSelf: this.props.isOwn ? "flex-end" : "flex-start",
    };

    if (!this.props.messageBody && !this.props.attachmentsCount) {
      return null;
    }
    return (
      <div
        style={this.wrapperStyle}
        onTouchTap={this.onSelect.bind(this)}>
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
  onSelect: React.PropTypes.func.isRequired,
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
  // dirty workaround to force a re-render when changing the global background color
  bgColor: selectBackgroundColor()(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  onTouch: (index, threadID) => dispatch(messageSelected(index, threadID)),
  onClickImage: (photoID) => dispatch(resolvePhotoUrl(photoID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MessageFrame));
