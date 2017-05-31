import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectIntl, intlShape} from "react-intl";
import {setClearDialog, clearUserData} from "./actions";
import {RaisedButton, FlatButton, Dialog} from "material-ui";
import messages from "./messages";
import {selectShowClearDialog} from "./selectors";
import {logout} from "../App/actions/requests";
import DeleteIcon from "material-ui/svg-icons/action/delete";

/*
Describes how the app treats private data and allows removing the current users complete data
including autotext, autoreplies etc.
*/
export class PrivacySettings extends React.PureComponent {

  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        secondary={true}
        label={formatMessage(messages.confirm)}
        onTouchTap={this.props.clearUserData}
      />,
      <FlatButton
        label={formatMessage(messages.cancel)}
        onTouchTap={this.props.closeClearDialog}
      />
    ];

    /* CSS background blur, not supported by older browsers */
    document.getElementById("app").style.filter = this.props.showClearDialog ? "blur(5px)" : "none";

    return (
      <div>
        <p>{formatMessage(messages.clearHint)}</p>
        <p>{formatMessage(messages.clearHint2)}</p>
        <div style={{textAlign: "center"}}>
          <RaisedButton
            secondary={true}
            label={formatMessage(messages.clearUserData)}
            icon={<DeleteIcon/>}
            onClick={this.props.openClearDialog}
          />
        </div>
        <Dialog
          title={formatMessage(messages.clearHeader)}
          actions={actions}
          modal={true}
          open={this.props.showClearDialog}>
          <div>
            {formatMessage(messages.clearWarning)}
          </div>
        </Dialog>
      </div>
    );
  }
}

PrivacySettings.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  showClearDialog: selectShowClearDialog(),
});

const mapDispatchToProps = (dispatch) => ({
  clearUserData: () => {
    dispatch(clearUserData());
    dispatch(logout());
  },
  openClearDialog: () => dispatch(setClearDialog(true)),
  closeClearDialog: () => dispatch(setClearDialog(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PrivacySettings));
