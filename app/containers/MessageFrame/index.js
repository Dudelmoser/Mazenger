import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from 'react-intl';
import {selectMessage, selectTimeStamp, selectIsOwn, selectIsSequel, selectTimePassed, selectSenderName,
  selectAttachmentsCount, selectMessageBody, selectIsSelected
} from "./selectors";
import {toggleMessageSelect} from "./actions";
import {fromJS} from "immutable";
import Message from "../../components/Message";
import Timestamp from "../../components/Timestamp";
import {resolvePhotoUrl} from "../App/actions/requests";
import Tooltip from "react-tooltip";
import {selectBackgroundColor} from "../ThemeSettings/selectors";
import {createStructuredSelector} from "reselect";

export class MessageFrame extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  maxTimeSpan = 5; // in minutes

  wrapperStyle = {
    display: "flex",
    flexDirection: "column"
  };

  /* Needs an overhaul */
  // getReaders() {
  //   const count = this.props.message.get("readers", fromJS([])).count();
  //   if (!count)
  //     return;
  //   return (
  //     <span style={{opacity: .5}}>✓
  //       {count > 1 ? <sup>{count}</sup> : null}
  //     </span>
  //   );
  // }

  render() {
    const divStyle = {
      overflow: "hidden",
      margin: "0.5em",
      marginBottom: "0",
      lineHeight: "32px",
      minHeight: "32px",
      opacity: this.props.isSelected ? .5 : 1,
      filter: this.props.isSelected ? "saturate(20%)" : "none",
      alignSelf: this.props.isOwn ? "flex-end" : "flex-start",
    };

    if (!this.props.messageBody && !this.props.attachmentsCount) {
      return null;
    }
    return (
      <div
        style={this.wrapperStyle}>
        <Timestamp
          timestamp={this.props.timestamp}
          condition={this.props.timePassed > this.maxTimeSpan * 60000}/>
        <div
          style={divStyle}
          onClick={this.props.toggleMessageSelect}>
          <Message
            message={this.props.message}
            tooltip={this.props.senderName}
            isOwn={this.props.isOwn}
            onClick={this.props.resolvePhotoUrl}
          />
          {/*{this.getReaders()}*/}
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

const mapStateToProps = (state, props) => createStructuredSelector({
  message: selectMessage(props.index, props.threadID),
  isOwn: selectIsOwn(props.index, props.threadID),
  isSequel: selectIsSequel(props.index, props.threadID),
  timestamp: selectTimeStamp(props.index, props.threadID),
  timePassed: selectTimePassed(props.index, props.threadID),
  senderName: selectSenderName(props.index, props.threadID),
  messageBody: selectMessageBody(props.index, props.threadID),
  attachmentsCount: selectAttachmentsCount(props.index, props.threadID),
  isSelected: selectIsSelected(props.index, props.threadID),
  // dirty workaround to force a re-render when changing the global background color
  bgColor: selectBackgroundColor(),
})(state);

const mapDispatchToProps = (dispatch, props) => ({
  resolvePhotoUrl: (photoID) => dispatch(resolvePhotoUrl(photoID)),
  toggleMessageSelect: (evt) => {
    dispatch(toggleMessageSelect(props.index, props.threadID));
    evt.stopPropagation();
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MessageFrame));
