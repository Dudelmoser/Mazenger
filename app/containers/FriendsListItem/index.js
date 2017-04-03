import React from "react";
import {connect} from "react-redux";
import {ListItem, Divider, Avatar} from "material-ui";
import {getThreadHistory} from "../App/actions/requests";
import {selectImageURL, selectFullName, selectProfileURL, selectHasBirthday, selectUserID} from "./selectors";
import muiThemeable from "material-ui/styles/muiThemeable";

export class FriendsListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    // Remove unnecessary muiThemeables in parent components and the following line
    // if the bug preventing muiThemeable to update is found
    const textColor = this.props.muiTheme.palette.textColor;
    return (
      <div key={this.props.index}>
        <ListItem
          leftAvatar={<Avatar src={this.props.imageURL}/>}
          primaryText={this.props.fullName}
          onTouchTap={this.props.click.bind(this, this.props.userID)}
        />
        <Divider
          inset={false}
          style={{backgroundColor: "rgba(127,127,127,0.2)"}}
        />
      </div>
    );
  }
}

FriendsListItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  imageURL: React.PropTypes.string,
  fullName: React.PropTypes.string,
  profileURL: React.PropTypes.string,
  hasBirthday: React.PropTypes.bool,
  userID: React.PropTypes.oneOfType(
    [React.PropTypes.number, React.PropTypes.string]),
}

const mapStateToProps = (state, props) => ({
  imageURL: selectImageURL(props.index)(state),
  fullName: selectFullName(props.index)(state),
  profileURL: selectProfileURL(props.index)(state),
  hasBirthday: selectHasBirthday(props.index)(state),
  userID: selectUserID(props.index)(state),
});

const mapDispatchToProps = (dispatch) => ({
  click: (userID) => dispatch(getThreadHistory(userID))
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(FriendsListItem));
