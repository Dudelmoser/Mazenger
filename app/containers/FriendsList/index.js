import React from "react";
import {connect} from "react-redux";
import {List, Subheader} from "material-ui";
import {selectFriendsCount} from "./selectors";
import {createStructuredSelector} from "reselect";
import FriendsListItem from "../FriendsListItem";

export class FriendsList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <List>
        <Subheader>Facebook</Subheader>
        {[...Array(this.props.friendsCount)].map((e, i) =>
          <FriendsListItem key={i} index={i}/>
        )}
      </List>
    );
  }
}

FriendsList.propTypes = {
  friendsCount: React.PropTypes.number
}

const mapStateToProps = createStructuredSelector({
  friendsCount: selectFriendsCount(),
});

export default connect(mapStateToProps)(FriendsList);
