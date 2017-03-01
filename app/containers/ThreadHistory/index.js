import React from "react";
import {connect} from "react-redux";
import MessageFrame from "../MessageFrame";
import {selectMyThreadID} from "../LoginModal/selectors";
import {selectCurrentTypers, selectCurrentHistory} from "./selectors";

export class ThreadHistory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  wrapperStyle = {
    marginBottom: "0.5em"
  }

  typersStyle = {
    textAlign: "center",
    fontSize: "0.75em",
    color: "#999"
  }

  componentDidUpdate() {
    this.props.onUpdate();
  }

  getUsersTyping() {
    if (!this.props.typing || this.props.typing.length < 1)
      return;

    let str = "";
    if (this.props.typing.length < 4) {
      for (let i = 0; i < this.props.typing.length; i++) {
        str += this.props.typing[i];
        if (i != this.props.typing.length - 1)
          str += ",";
        str += " ";
      }
      str += "is "
    } else {
      str += this.props.typing.length + " users are ";
    }

    return <div style={this.typersStyle}>{str + "typing..."}</div>
  }

  render() {
    return (
      <div style={this.wrapperStyle}>
        {this.props.history.map((message, index) =>
          <MessageFrame
            key={index}
            index={index}
            threadID={this.props.threadID}
          />
        )}
        {this.getUsersTyping()}
      </div>
    );
  }
}

ThreadHistory.propTypes = {
  onUpdate: React.PropTypes.func,
  threadID: React.PropTypes.oneOfType(
    [React.PropTypes.string, React.PropTypes.number]),
  typing: React.PropTypes.array,
}

const mapStateToProps = (state) => ({
  threadID: selectMyThreadID()(state),
  typing: selectCurrentTypers()(state),
  history: selectCurrentHistory()(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadHistory);
