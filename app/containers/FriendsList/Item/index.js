import React from "react";
import {connect} from "react-redux";
import {ListItem, Divider, Avatar} from "material-ui";
import {getThreadHistory} from "../../App/actions/requests";
import {selectImageURL, selectFullName, selectProfileURL, selectHasBirthday, selectUserID} from "./selectors";
import muiThemeable from "material-ui/styles/muiThemeable";
import CakeIcon from "material-ui/svg-icons/social/cake";

/*
The item part of a friends list which is tightly coupled to the to list itself
and therefore stored in a sub directory of the list container.
*/
export class FriendsListItem extends React.PureComponent {

  render() {
    return (
      <div key={this.props.index}>
        <ListItem
          leftAvatar={<Avatar src={this.props.imageURL}/>}
          rightIcon={this.props.hasBirthday ? <CakeIcon/> : <div/>}
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
};

/*
Use the standard syntax instead of createStructuredSelector() when you need to
pass the component's own props to the selector creator.
*/
const mapStateToProps = (state, ownProps) => ({
  userID: selectUserID(ownProps.index)(state),
  fullName: selectFullName(ownProps.index)(state),
  imageURL: selectImageURL(ownProps.index)(state),
  profileURL: selectProfileURL(ownProps.index)(state),
  hasBirthday: selectHasBirthday(ownProps.index)(state),
});

const mapDispatchToProps = (dispatch) => ({
  click: (userID) => dispatch(getThreadHistory(userID))
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(FriendsListItem));
