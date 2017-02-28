import React from "react";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import messages from "./messages";
import {createStructuredSelector} from "reselect";
import {selectThreadIDs} from "./selectors";
import {List, Subheader} from "material-ui";
import Thread from "../ThreadListItem";

export class ThreadList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <List>
        <Subheader><FormattedMessage {...messages.header}/></Subheader>
        {this.props.threadIDs.map((threadID, key) =>
          <Thread
            key={threadID}
            threadID={threadID}
          />
        )}
      </List>
    );
  }
}

ThreadList.propTypes = {
  threadIDs: React.PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  threadIDs: selectThreadIDs(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList);
