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
import {createStructuredSelector} from "reselect";
import styled from "styled-components";

/*
A stateful wrapper for the message and timestamp components.
*/
export class MessageContainer extends React.Component {

  /* Minimum time passed between the current and previous message to render a timestamp. */
  maxTimeSpan = 5; // minutes

  render() {
    const style = {
      display: "flex",
      flexDirection: "column",
      opacity: this.props.isSelected ? .5 : 1,
      filter: this.props.isSelected ? "saturate(20%)" : "none",
    };

    const logMessage = this.props.message.get("logMessageBody");
    const LogMessage = styled.aside`
      margin-top: 1em;
      text-align: center;
    `;

    /* TODO: Implement a readers indicator. */
    return (
      <div
        style={style}
        onContextMenu={this.props.toggleMessageSelect}>
        {
          logMessage
          ? <LogMessage>{logMessage}</LogMessage>
          : <Timestamp
              timestamp={this.props.timestamp}
              condition={this.props.timePassed > this.maxTimeSpan * 60000}
            />
        }
        <Message
          message={this.props.message}
          tooltip={this.props.senderName}
          isOwn={this.props.isOwn}
          onClick={this.props.resolvePhotoUrl}
        />
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

/* Mix between standard mapStateToProps and createStructuredSelector. */
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
