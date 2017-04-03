import React from "react";
import {connect} from "react-redux";
import MessageFrame from "../MessageFrame";
import {Scrollbars} from "react-custom-scrollbars";
import {selectCurrentThreadID} from "../LoginModal/selectors";
import {selectCurrentTypersNames, selectCurrentHistory} from "./selectors";
import {createStructuredSelector} from "reselect";
import {deleteMessages, selectAllMessages, deselectAllMessages, loadMoreMessages} from "./actions";
import {titleHeight} from "../App/components";
import muiThemeable from "material-ui/styles/muiThemeable";

export class ThreadHistory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    prevThread: 0,
    prevHeight: 0,
  }

  styles = {
    wrapper: {
      paddingTop: titleHeight,
      paddingBottom: titleHeight * 2,
    },
    typers: {
      textAlign: "center",
      fontSize: "0.75em",
      color: "#999",
    },
  };

  render() {
    return (
      <Scrollbars
        ref="scrollbar"
        autoHide={true}
        onScrollFrame={(values) => {
          if (values.top == 0) this.props.loadMore()}
        }>
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
      </Scrollbars>
    );
  }

  componentWillUpdate() {
    if (this.refs && this.refs.scrollbar.getScrollTop() == 0) {
      this.setState({
        prevHeight: this.refs.scrollbar.getScrollHeight(),
      });
    }
  }

  componentDidUpdate() {
    if (this.props.threadID == this.state.prevThread) {
      const top = this.refs.scrollbar.getScrollHeight() - this.state.prevHeight;
      this.refs.scrollbar.scrollTop(top);
    } else {
      this.scrollToBottom();
      this.setState({
        prevThread: this.props.threadID,
      });
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.refs)
      this.refs.scrollbar.scrollToBottom();
  }

  // add intl support
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
  loadMore: () => dispatch(loadMoreMessages()),
});

// muiThemeable needed for nested message components to receive theme updates - reason?
export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(ThreadHistory));
