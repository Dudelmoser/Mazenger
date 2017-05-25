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

export class ThreadHistory extends React.PureComponent {

  state = {
    prevThread: 0,
    prevHeight: 0,
    prevScrollTop: 0,
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
          if (values.top == 0) {
            this.props.loadMore();
            this.setState({prevHeight: values.scrollHeight});
          }
          this.setState({prevScrollTop: values.top});
        }}>
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

  componentDidUpdate() {
    const top = this.refs.scrollbar.getScrollHeight() - this.state.prevHeight;
    // scroll to bottom if thread changed or message arrived
    if (this.props.threadID != this.state.prevThread || this.state.prevScrollTop == 1) {
      this.refs.scrollbar.scrollToBottom();
      this.setState({prevThread: this.props.threadID});
    }
    // keep scroll position when more history is loaded
    if (this.state.prevScrollTop == 0) {
      this.refs.scrollbar.scrollTop(top);
    }
  }

  componentDidMount() {
    if (this.refs) this.refs.scrollbar.scrollToBottom();
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
    // delete messages with DELETE and BACKSPACE
    if (evt.keyCode == 46 || evt.keyCode == 8) {
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
