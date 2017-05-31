import React from "react";
import {connect} from "react-redux";
import MessageFrame from "../MessageContainer";
import {Scrollbars} from "react-custom-scrollbars";
import {selectCurrentThreadID} from "../LoginModal/selectors";
import {selectCurrentTypersNames, selectCurrentHistory, selectIsViewerVisible, selectViewerArray} from "./selectors";
import {createStructuredSelector} from "reselect";
import {deleteMessages, selectAllMessages, deselectAllMessages, loadMoreMessages} from "./actions";
import muiThemeable from "material-ui/styles/muiThemeable";
import {barHeight} from "../App/components";
import Viewer from "react-viewer";
import "react-viewer/dist/index.css";
import {injectGlobal} from "styled-components";
import {closePhotoViewer} from "./actions";
import {selectBackgroundColor} from "../ThemeSettings/selectors";

export class ThreadHistory extends React.PureComponent {

  state = {
    prevThread: 0,
    prevHeight: 0,
    prevScrollTop: 0,
  };

  styles = {
    wrapper: {
      paddingTop: barHeight,
      paddingBottom: barHeight * 2,
    },
    typers: {
      textAlign: "center",
      fontSize: "0.75em",
      color: "#999",
    },
  };

  render() {
    /* CSS background blur, not supported by older browsers */
    document.getElementById("app").style.filter = this.props.isPhotoVisible ? "blur(5px)" : "none";

    return (
      <Scrollbars
        ref="scrollbar"
        autoHide={true}
        onScrollFrame={(values) => {
          if (values.top === 0) {
            this.props.loadMore();
            this.setState({prevHeight: values.scrollHeight});
          }
          this.setState({prevScrollTop: values.top});
        }}>
        <Viewer
          visible={this.props.isPhotoVisible}
          onClose={this.props.closeViewer}
          images={this.props.photoArray}
        />
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

  componentDidUpdate(prevProps) {
    const top = this.refs.scrollbar.getScrollHeight() - this.state.prevHeight;
    // scroll to bottom if thread changed or message arrived
    if (this.props.threadID !== this.state.prevThread || this.state.prevScrollTop === 1) {
      this.refs.scrollbar.scrollToBottom();
      this.setState({prevThread: this.props.threadID});
    }
    // keep scroll position when more history is loaded
    if (this.state.prevScrollTop === 0) {
      this.refs.scrollbar.scrollTop(top);
    }

    if (this.props.bgColor !== prevProps.bgColor)
      this.injectViewerStyles();
  }

  componentDidMount() {
    if (this.refs) this.refs.scrollbar.scrollToBottom();
    this.injectViewerStyles();
  }

  injectViewerStyles = () => {
    injectGlobal`
    .react-viewer-close, .react-viewer-navbar {
      background-color: transparent;
    }
    .react-viewer-btn, .react-viewer-toolbar li, .react-viewer-toolbar li:hover {
      margin-left: 3px;
      background-color: transparent;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .react-viewer-toolbar li:hover {
      opacity: 0.5;
    }
    .react-viewer-mask {
      background-color: ${this.props.muiTheme.overlay.backgroundColor};
    }
    .react-viewer-icon {
      color: ${this.props.muiTheme.palette.textColor};
    }
    .react-viewer-icon:hover {
      color: ${this.props.muiTheme.palette.textColor};
    }
    `;
  };

  // add intl support
  getUsersTyping() {
    if (!this.props.typing || this.props.typing.length < 1)
      return;

    let str = "";
    if (this.props.typing.length < 4) {
      for (let i = 0; i < this.props.typing.length; i++) {
        str += this.props.typing[i];
        if (i !== this.props.typing.length - 1)
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
  photoArray: selectViewerArray(),
  isPhotoVisible: selectIsViewerVisible(),
  bgColor: selectBackgroundColor(),
});

const mapDispatchToProps = (dispatch, props) => ({
  handleKeypress: (evt) => {
    // delete messages with DELETE and BACKSPACE
    if (evt.keyCode === 46 || evt.keyCode === 8) {
      dispatch(deleteMessages());
    } else if (evt.ctrlKey && evt.keyCode === 65) {
      dispatch(selectAllMessages());
      evt.preventDefault();
    }
  },
  deselectAll: () => dispatch(deselectAllMessages()),
  loadMore: () => dispatch(loadMoreMessages()),
  closeViewer: () => dispatch(closePhotoViewer())
});

// muiThemeable needed for nested message components to receive theme updates - reason?
export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(ThreadHistory));
