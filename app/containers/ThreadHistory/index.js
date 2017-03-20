import React from "react";
import {connect} from "react-redux";
import MessageFrame from "../MessageFrame";
import {selectCurrentThreadID} from "../LoginModal/selectors";
import {selectCurrentTypersNames, selectCurrentHistory} from "./selectors";
import {createStructuredSelector} from "reselect";
import {deleteMessages, selectAllMessages, deselectAllMessages} from "./actions";

export class ThreadHistory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  styles = {
    wrapper: {
      marginBottom: "0.5em",
    },
    typers: {
      textAlign: "center",
      fontSize: "0.75em",
      color: "#999",
    },
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

    return <div style={this.styles.typers}>{str + "typing..."}</div>
  }

  render() {
    return (
      <div
        tabIndex="0"
        onClick={this.props.deselectAll}
        onKeyDown={this.props.handleKeypress}
        style={this.styles.wrapper}>
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

  componentDidUpdate() {
    this.props.onUpdate();
  }
}

ThreadHistory.propTypes = {
  onUpdate: React.PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  threadID: selectCurrentThreadID(),
  typing: selectCurrentTypersNames(),
  history: selectCurrentHistory(),
});

const mapDispatchToProps = (dispatch, props) => ({
  handleKeypress: (evt) => {
    if (evt.keyCode == 46) {
      dispatch(deleteMessages());
    } else if (evt.ctrlKey && evt.keyCode == 65) {
      dispatch(selectAllMessages());
      evt.preventDefault();
    }
  },
  deselectAll: () => dispatch(deselectAllMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadHistory);
