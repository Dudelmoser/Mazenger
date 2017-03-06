import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import {Dialog, FlatButton, TextField} from "material-ui";
import {selectIsLoggedIn, selectEmail, selectPassword} from "./selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {login} from "../App/actions/requests";
import {changeEmail, changePassword} from "./actions";
import {injectIntl} from "react-intl";

export class LoginModal extends React.Component {

  bodyStyle = {
    fontSize: "1rem",
  }

  actionContainerStyle = {
    textAlign: "center"
  }

  render() {
    const contentStyle = {
      overflow: "hidden",
      boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
    }

    const actions = [
      <FlatButton
        label="Login"
        primary={true}
        disabled={false}
        onTouchTap={this.props.login}
      />
    ];

    // css background blur, not supported by older browsers
    document.getElementById("app").style.filter = this.props.loggedIn ? "none" : "blur(5px)";

    return (
        <Dialog
          title="Login"
          actions={actions}
          modal={true}
          open={!this.props.loggedIn}
          contentStyle={contentStyle}
          bodyStyle={this.bodyStyle}
          actionsContainerStyle={this.actionContainerStyle}>
          <div>
            Connect mazenger to your facebook account. Your login data will be transferred to the facebook server once and
            discarded right after. We only save your session inside the local storage.
            <br/>
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              type="text"
              onChange={this.props.changeEmail}
            />
            <br/>
            <TextField
              hintText="Password"
              floatingLabelText="Password"
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
