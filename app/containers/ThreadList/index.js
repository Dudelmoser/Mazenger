import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectThreadIDs} from "./selectors";
import {List} from "material-ui";
import Thread from "../ThreadListItem";
import {selectCurrentUserID} from "../LoginModal/selectors";

export class ThreadList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

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
