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

export class LoginModal extends React.Component {

  styles = {
    body: {
      fontSize: "1rem",
    },
    actionContainer: {
      textAlign: "center"
    },
  }

  render() {
    // class properties won't change on re-render
    const styles = {
      underline: {
        borderColor: this.props.loginState == -1
          ? this.props.muiTheme.raisedButton.secondaryColor
          : this.props.muiTheme.palette.borderColor,
      },
      underlineFocus: {
        borderColor: this.props.loginState == -1
          ? this.props.muiTheme.raisedButton.secondaryColor
          : this.props.muiTheme.palette.primary1Color,
      },
      floatingLabel: {
        color: this.props.loginState == -1
            ? this.props.muiTheme.raisedButton.secondaryColor
            : this.props.muiTheme.palette.secondaryTextColor,
      },
      floatingLabelFocus: {
        color: this.props.loginState == -1
          ? this.props.muiTheme.raisedButton.secondaryColor
          : this.props.muiTheme.palette.secondaryTextColor,
      },
    };

    const {formatMessage} = this.props.intl;

    const actions = [
      this.props.loginState != 10 ? <FlatButton
        label={formatMessage(messages.login)}
        primary={true}
        disabled={false}
        onTouchTap={this.props.login}
      /> : <CircularProgress size={37}/>
    ];

    // css background blur, not supported by older browsers
    document.getElementById("app").style.filter = this.props.loggedIn ? "none" : "blur(5px)";

    return (
        <Dialog
          title={this.props.loginState == -1 ? formatMessage(messages.wrongLogin) : formatMessage(messages.login)}
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
              onKeyUp={this.props.handleKeyUp.bind(this, 0)}
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
              onKeyUp={this.props.handleKeyUp.bind(this, 1)}
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

  // focus email input on website (re)load
  componentDidMount() {
    this.focusInput(EMAIL_INPUT);
  }

  // focus password input after logout with a small delay
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
  changePassword: (event) => dispatch(changePassword()),
  dispatch,
});

// mergeProps instead of dispatchProps to pass the email stateProp to the login action
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {email, loggedIn, loginState} = stateProps;
  const {dispatch, changeEmail, changePassword} = dispatchProps;
  return {
    email,
    loggedIn,
    loginState,
    changeEmail,
    changePassword,
    login: () => {
      // password is loaded from DOM to avoid leaking it via persisted state
      const pwd = document.getElementById(PWD_INPUT).value;
      dispatch(login({email: stateProps.email, password: pwd}));
    },
    handleKeyUp: (inputID, event) => {
      // handle return key event
      if (event.keyCode == 13) {
        // jump from email to password input
        if (inputID == 0) {
          document.getElementById(PWD_INPUT).focus();
        // login if password input focused
        } else if (inputID == 1) {
          const pwd = document.getElementById(PWD_INPUT).value;
          dispatch(login({email: stateProps.email, password: pwd}));
        }
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(muiThemeable()(injectIntl(LoginModal)));
