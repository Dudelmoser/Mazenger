import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectIntl, intlShape} from "react-intl";
import {confirmClearSettings, clearSettings} from "./actions";
import {RaisedButton, FlatButton, Dialog} from "material-ui";
import messages from "./messages";
import {selectClearConfirmed} from "./selectors";
import {logout} from "../App/actions/requests";

export class PrivacySettings extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  alertColor = "#D64541";

  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        label={formatMessage(messages.confirm)}
        primary={true}
        disabled={false}
        onTouchTap={this.props.clearSettings}
      />,
      <FlatButton
        label={formatMessage(messages.cancel)}
        primary={true}
        disabled={false}
        onTouchTap={this.props.cancelClearSettings}
      />
    ];

    // css background blur, not supported by older browsers
    document.getElementById("app").style.filter = this.props.clearConfirmed ? "blur(5px)" : "none";

    return (
      <div>
        <p>{formatMessage(messages.clearHint)}</p>
        <p>{formatMessage(messages.clearHint2)}</p>
        <RaisedButton
          primary={true}
          backgroundColor={this.alertColor}
          label={formatMessage(messages.clearSettings)}
          onClick={this.props.confirmClearSettings}
        />
        <Dialog
          title={formatMessage(messages.clearHeader)}
          actions={actions}
          modal={true}
          open={this.props.clearConfirmed}
          actionsContainerStyle={this.actionContainerStyle}>
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
}

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
