import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import {Dialog, FlatButton, TextField} from "material-ui";
import {selectIsLoggedIn, selectEmail, selectPassword} from "./selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {login} from "../App/actions/requests";
import {changeEmail, changePassword} from "./actions";
import {injectIntl} from "react-intl";
import messages from "./messages";

export class LoginModal extends React.Component {

  bodyStyle = {
    fontSize: "1rem",
  }

  actionContainerStyle = {
    textAlign: "center"
  }

  render() {
    const {formatMessage} = this.props.intl;

    const actions = [
      <FlatButton
        label={formatMessage(messages.login)}
        primary={true}
        disabled={false}
        onTouchTap={this.props.login}
      />
    ];

    // css background blur, not supported by older browsers
    document.getElementById("app").style.filter = this.props.loggedIn ? "none" : "blur(5px)";

    return (
        <Dialog
          title={formatMessage(messages.login)}
          actions={actions}
          modal={true}
          open={!this.props.loggedIn}
          bodyStyle={this.bodyStyle}
          actionsContainerStyle={this.actionContainerStyle}>
          <div>
            {formatMessage(messages.hint)}
            <br/>
            <TextField
              hintText={formatMessage(messages.email)}
              floatingLabelText={formatMessage(messages.email)}
              type="text"
              onChange={this.props.changeEmail}
            />
            <br/>
            <TextField
              hintText={formatMessage(messages.password)}
              floatingLabelText={formatMessage(messages.password)}
              type="password"
              onChange={this.props.changePassword}
            />
            <br/>
          </div>
        </Dialog>
    );
  }
}

LoginModal.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  loggedIn: React.PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  email: selectEmail(),
  password: selectPassword(),
  loggedIn: selectIsLoggedIn()
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const dispatch = dispatchProps.dispatch;
  return {
    loggedIn: stateProps.loggedIn,
    login: () => dispatch(login({email: stateProps.email, password: stateProps.password})),
    changeEmail: (event) => dispatch(changeEmail(event.target.value)),
    changePassword: (event) => dispatch(changePassword(event.target.value)),
  }
};

export default connect(mapStateToProps, null, mergeProps)(muiThemeable()(injectIntl(LoginModal)));
