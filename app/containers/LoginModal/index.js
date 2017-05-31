import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import {CircularProgress, Dialog, FlatButton, TextField} from "material-ui";
import {selectIsLoggedIn, selectEmail, selectLoginState} from "./selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {login} from "../App/actions/requests";
import {changeEmail, changePassword} from "./actions";
import {injectIntl} from "react-intl";
import messages from "./messages";
import {PWD_INPUT, EMAIL_INPUT} from "./constants";

/*
A simple login overlay.
 */
export class LoginModal extends React.Component {

  styles = {
    body: {
      fontSize: "1rem",
    },
    actionContainer: {
      textAlign: "center"
    },
  };

  render() {
    /* Paints the login inputs and their labels red if the login data was wrong. */
    const styles = {
      underline: {
        borderColor: this.props.loginState === -1
          ? this.props.muiTheme.raisedButton.secondaryColor
          : this.props.muiTheme.palette.borderColor,
      },
      underlineFocus: {
        borderColor: this.props.loginState === -1
          ? this.props.muiTheme.raisedButton.secondaryColor
          : this.props.muiTheme.palette.primary1Color,
      },
      floatingLabel: {
        color: this.props.loginState === -1
            ? this.props.muiTheme.raisedButton.secondaryColor
            : this.props.muiTheme.palette.secondaryTextColor,
      },
      floatingLabelFocus: {
        color: this.props.loginState === -1
          ? this.props.muiTheme.raisedButton.secondaryColor
          : this.props.muiTheme.palette.secondaryTextColor,
      },
    };

    const {formatMessage} = this.props.intl;

    const actions = [
      this.props.loginState !== 10 ?
        <FlatButton
          label={formatMessage(messages.login)}
          primary={true}
          disabled={false}
          onTouchTap={this.props.login}
        /> : <CircularProgress size={37}/>
    ];

    /* CSS background blur, not supported by older browsers */
    document.getElementById("app").style.filter = this.props.loggedIn ? "none" : "blur(5px)";

    return (
        <Dialog
          title={this.props.loginState === -1 ? formatMessage(messages.wrongLogin) : formatMessage(messages.login)}
          actions={actions}
          modal={true}
          open={!this.props.loggedIn}
          bodyStyle={this.styles.body}
          actionsContainerStyle={this.styles.actionContainer}>
          <div>
            {formatMessage(messages.hint)}
            <br/>
            <TextField
              id={EMAIL_INPUT}
              type="text"
              spellCheck={false}
              value={this.props.email}
              onChange={this.props.changeEmail}
              onKeyUp={this.props.onEmailChange}
              floatingLabelFixed={true}
              floatingLabelText={formatMessage(messages.email)}
              floatingLabelStyle={styles.floatingLabel}
              floatingLabelFocusStyle={styles.floatingLabelFocus}
              underlineStyle={styles.underline}
              underlineFocusStyle={styles.underlineFocus}
            />
            <br/>
            <TextField
              id={PWD_INPUT}
              type="password"
              onChange={this.props.changePassword}
              onKeyUp={this.props.onPasswordChange}
              floatingLabelFixed={true}
              floatingLabelText={formatMessage(messages.password)}
              floatingLabelStyle={styles.floatingLabel}
              floatingLabelFocusStyle={styles.floatingLabelFocus}
              underlineStyle={styles.underline}
              underlineFocusStyle={styles.underlineFocus}
            />
            <br/>
          </div>
        </Dialog>
    );
  }

  /* Focus email input on (re)load. */
  componentDidMount() {
    this.focusInput(EMAIL_INPUT);
  }

  /* Focus password input after logout. The delay ensures the password input is actually focusable. */
  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn && !this.props.loggedIn) {
      setTimeout(this.focusInput.bind(this, PWD_INPUT), 500);
    }
  }

  focusInput(id) {
    const input = document.getElementById(id);
    if (input)
      input.focus();
  }
}

LoginModal.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  loggedIn: React.PropTypes.bool,
  loginState: React.PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  email: selectEmail(),
  loggedIn: selectIsLoggedIn(),
  loginState: selectLoginState(),
});

const mapDispatchToProps = (dispatch) => ({
  changeEmail: (event) => dispatch(changeEmail(event.target.value)),
  changePassword: () => dispatch(changePassword()),
  /* Pass the dispatcher to the mergeProps */
  dispatch,
});

/* Use mergeProps instead of dispatchProps to pass stateProps (e.g. email) to the login action creator. */
const mergeProps = (stateProps, dispatchProps) => {
  const {changeEmail, changePassword, dispatch} = dispatchProps;
  return {
    ...stateProps,
    changeEmail,
    changePassword,
    login: () => {
      /* Loads the password from the DOM to avoid leaking it via persisted state. */
      const pwd = document.getElementById(PWD_INPUT).value;
      dispatch(login({email: stateProps.email, password: pwd}));
    },
    onEmailChange: (event) => {
      /* Jump to the password input using the return key. */
      if (event.keyCode === 13) {
        document.getElementById(PWD_INPUT).focus();
      }
    },
    onPasswordChange: (event) => {
      /* Log in using the return key. */
      if (event.keyCode === 13) {
        const pwd = document.getElementById(PWD_INPUT).value;
        dispatch(login({email: stateProps.email, password: pwd}));
      }
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(muiThemeable()(injectIntl(LoginModal)));
