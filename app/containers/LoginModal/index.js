import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from "material-ui/TextField";
import {selectIsLoggedIn, selectEmail, selectPassword} from "./selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {login} from "../App/actions/requests";
import {changeEmail, changePassword} from "./actions";

export class LoginModal extends React.Component {

  overlayStyle = {
    backgroundColor: "rgba(16,18,19,0.95)"
  }

  actionContainerStyle = {
    textAlign: "center"
  }

  render() {
    const actions = [
      <FlatButton
        label="Login"
        primary={true}
        disabled={false}
        onTouchTap={this.props.login}
      />
    ];

    return (
        <Dialog
          title="Login"
          actions={actions}
          modal={true}
          open={!this.props.loggedIn}
          overlayStyle={this.overlayStyle}
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

export default connect(mapStateToProps, null, mergeProps)(LoginModal);
