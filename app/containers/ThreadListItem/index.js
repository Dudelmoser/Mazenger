import React from "react";
import {connect} from "react-redux";
import {getThreadHistory} from "../App/actions/requests";
import {selectThreadSnippet, selectThreadTitle, selectThreadImageURL, selectHasAttachment} from "./selectors";
import {ListItem, Divider, Avatar} from "material-ui";
import emoji from "react-easy-emoji";
import Attachment from 'material-ui/svg-icons/file/attachment';
import muiThemeable from "material-ui/styles/muiThemeable";

export class ThreadListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    // Catch react-easy-emoji error when empty string is passed.
    // Usually happens after cleaning the cache.

    const attachBtnStyle = {
      position: "absolute",
      top: 24,
      right: 12,
      color: this.props.muiTheme.palette.secondaryTextColor,
      display: this.props.hasAttachment ? "block" : "none"
    }

    try {
      return (
        <div style={{position: "relative"}}>
          <ListItem
            leftAvatar={<Avatar src={this.props.imageURL}/>}
            primaryText={this.props.title}
            secondaryText={
              <p style={{width: "90%"}}>{emoji(this.props.snippet)}</p>
            }
            secondaryTextLines={1}
            onTouchTap={this.props.onTouch.bind(this, this.props.threadID)}
          />
          <Attachment style={attachBtnStyle}/>
          <Divider
            inset={false}
            style={{backgroundColor: "rgba(127,127,127,0.2)"}}/>
        </div>
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

ThreadListItem.propTypes = {
  threadID: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.string]).isRequired,
  title: React.PropTypes.string,
  snippet: React.PropTypes.string,
  imageURL: React.PropTypes.string,
  onTouch: React.PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  title: selectThreadTitle(ownProps.threadID)(state),
  snippet: selectThreadSnippet(ownProps.threadID)(state),
  imageURL: selectThreadImageURL(ownProps.threadID)(state),
  hasAttachment: selectHasAttachment(ownProps.threadID)(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTouch: (threadID) => dispatch(getThreadHistory(threadID))
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(ThreadListItem));
