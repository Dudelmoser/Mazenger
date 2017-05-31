import React from "react";
import {connect} from "react-redux";
import {List} from "material-ui";
import {selectFriendsCount} from "./selectors";
import {createStructuredSelector} from "reselect";
import FriendsListItem from "./Item";
import {selectBackgroundColor} from "../ThemeSettings/selectors";
import muiThemeable from "material-ui/styles/muiThemeable";

/*
A friends list skeleton which simply maps the array indices to the actual list items.
This allows hiding the property names determined by the facebook API from the view.
*/
export class FriendsList extends React.PureComponent {

  render() {
    return (
      <List>
        {[...Array(this.props.friendsCount)].map((e, i) =>
          <FriendsListItem key={i} index={i}/>
        )}
      </List>
    );
  }
}

FriendsList.propTypes = {
  friendsCount: React.PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  friendsCount: selectFriendsCount(),
  /* Dirty workaround to force a re-render when changing the theme. */
  color: selectBackgroundColor(),
});

export default connect(mapStateToProps)(muiThemeable()(FriendsList));
