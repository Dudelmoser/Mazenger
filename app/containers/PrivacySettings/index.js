import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectIntl, intlShape} from "react-intl";
import {confirmClearSettings, clearSettings} from "./actions";
import {RaisedButton, FlatButton, Dialog} from "material-ui";
import messages from "./messages";
import {selectClearConfirmed} from "./selectors";
import {logout} from "../App/actions/requests";
import DeleteIcon from "material-ui/svg-icons/action/delete";

export class PrivacySettings extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        secondary={true}
        label={formatMessage(messages.confirm)}
        onTouchTap={this.props.clearSettings}
      />,
      <FlatButton
        label={formatMessage(messages.cancel)}
        onTouchTap={this.props.cancelClearSettings}
      />
    ];

    // css background blur, not supported by older browsers
    document.getElementById("app").style.filter = this.props.clearConfirmed ? "blur(5px)" : "none";

    return (
      <div>
        <p>{formatMessage(messages.clearHint)}</p>
        <p>{formatMessage(messages.clearHint2)}</p>
        <div style={{textAlign: "center"}}>
          <RaisedButton
            secondary={true}
            label={formatMessage(messages.clearSettings)}
            icon={<DeleteIcon/>}
            onClick={this.props.confirmClearSettings}
          />
        </div>
        <Dialog
          title={formatMessage(messages.clearHeader)}
          actions={actions}
          modal={true}
          open={this.props.clearConfirmed}>
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
  clearConfirmed: selectClearConfirmed(),
});

const mapDispatchToProps = (dispatch) => ({
  clearSettings: () => {
    dispatch(clearSettings());
    dispatch(logout());
  },
  confirmClearSettings: () => dispatch(confirmClearSettings(true)),
  cancelClearSettings: () => dispatch(confirmClearSettings(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PrivacySettings));
