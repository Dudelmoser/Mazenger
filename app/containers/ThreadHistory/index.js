import React from "react";
import {connect} from "react-redux";
import MessageFrame from "../MessageFrame";
import {selectCurrentThreadID} from "../LoginModal/selectors";
import {selectCurrentTypersNames, selectCurrentHistory} from "./selectors";
import {Set} from "immutable";

export class ThreadHistory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    selected: Set()
  }

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

  setSelected(msgIdx, msgState) {
    this.setState({selected: this.state.selected.withMutations(state => {
      if (msgState) {
        state.add(msgIdx);
      } else {
        state.delete(msgIdx);
      }
    })});
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
      <div style={this.styles.wrapper}>
        {this.props.history.map((message, index) =>
          <MessageFrame
            key={index}
            index={index}
            threadID={this.props.threadID}
            onSelect={this.setSelected.bind(this, index)}
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
  threadID: React.PropTypes.oneOfType(
    [React.PropTypes.string, React.PropTypes.number]),
  typing: React.PropTypes.array,
}

const mapStateToProps = (state) => ({
  threadID: selectCurrentThreadID()(state),
  typing: selectCurrentTypersNames()(state),
  history: selectCurrentHistory()(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadHistory);
