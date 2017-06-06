import React from "react";
import {connect} from "react-redux";
import {injectIntl, intlShape} from 'react-intl';
import {selectMessage, selectTimeStamp, selectIsOwn, selectIsSequel, selectTimePassed, selectSenderName,
  selectAttachmentsCount, selectMessageBody, selectIsSelected
} from "./selectors";
import {toggleMessageSelect} from "./actions";
import Message from "../../components/Message";
import Timestamp from "../../components/Timestamp";
import {resolvePhotoUrl} from "../App/actions/requests";
import Tooltip from "react-tooltip";
import {selectAccentColor, selectBackgroundColor} from "../ThemeManager/selectors";
import {createStructuredSelector} from "reselect";

/*
A stateful wrapper for the message and timestamp components.
*/
export class MessageContainer extends React.PureComponent {

  /* Minimum time passed between the current and previous message to render a timestamp. */
  maxTimeSpan = 5; // minutes

  style = {
    display: "flex",
    flexDirection: "column"
  };

  render() {
    const style = {
      overflow: "hidden",
      margin: "0.5em",
      marginBottom: "0",
      lineHeight: "32px",
      minHeight: "32px",
      opacity: this.props.isSelected ? .5 : 1,
      filter: this.props.isSelected ? "saturate(20%)" : "none",
      alignSelf: this.props.isOwn ? "flex-end" : "flex-start",
    };

    /* Don't render empty messages. */
    if (!this.props.messageBody && !this.props.attachmentsCount) {
      return null;
    }

    /* TODO: Implement a readers indicator. */
    return (
      <div
        style={this.style}>
        <Timestamp
          timestamp={this.props.timestamp}
          condition={this.props.timePassed > this.maxTimeSpan * 60000}/>
        <div
          style={style}
          onContextMenu={this.props.toggleMessageSelect}>
          <Message
            message={this.props.message}
            tooltip={this.props.senderName}
            isOwn={this.props.isOwn}
            onClick={this.props.resolvePhotoUrl}
          />
        </div>
      </div>
    );
  }

  /* Tooltip doesn't work reliably without delayed rebuild */
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

MessageContainer.propTypes = {
  intl: intlShape.isRequired,
  index: React.PropTypes.number.isRequired,
  threadID: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.string]).isRequired,
};

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
  /* dirty workaround to force a re-render when changing the theme */
  bgColor: selectBackgroundColor(),
  accentColor: selectAccentColor(),
})(state);

const mapDispatchToProps = (dispatch, props) => ({
  resolvePhotoUrl: (photoID) => dispatch(resolvePhotoUrl(photoID)),
  toggleMessageSelect: (evt) => {
    evt.preventDefault();
    dispatch(toggleMessageSelect(props.index, props.threadID));
    return false;
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MessageContainer));
