import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectThreadIDs} from "./selectors";
import {List} from "material-ui";
import Thread from "./Item";
import {selectCurrentUserID} from "../LoginModal/selectors";

/*
 A thread list skeleton which simply maps the array indices to the actual list items.
 This allows hiding the property names determined by the facebook API from the view
 and increases performance cause of the ability to re-render specific messages
 instead of the whole thread history.
 */
export class ThreadList extends React.PureComponent {

  render() {
    return (
      <List>
        {this.props.threadIDs.map((threadID) =>
          threadID == this.props.userID ? null :
            <Thread
              key={threadID}
              threadID={threadID}
            />
        )}
      </List>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  threadIDs: selectThreadIDs(),
  userID: selectCurrentUserID(),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList);
