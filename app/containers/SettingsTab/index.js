import React from "react";
import {injectIntl, intlShape} from "react-intl";
import ThemeSettings from "../ThemeSettings";
import PrivacySettings from "../PrivacySettings";
import {Stepper, Step, StepButton, StepContent} from "material-ui";
import {injectGlobal} from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";
import messages from "./messages";
import KeyList from "../KeyList";

export class SettingsTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    stepIndex: 0,
  };

  wrapperStyle = {
    padding: "0 1rem 0 0",
  }

  render() {
    injectGlobal`
      .stepper>div span>span>svg>text {
        fill: ${this.props.muiTheme.palette.alternateTextColor};
      }
    `;

    const {formatMessage} = this.props.intl;

    return (
     <div style={this.wrapperStyle}>
       <Stepper
         linear={false}
         activeStep={this.state.stepIndex}
         orientation="vertical">
         <Step>
           <StepButton onClick={() => this.setState({stepIndex: 0})} className="stepper">
             {formatMessage(messages.theme)}
           </StepButton>
           <StepContent>
              <ThemeSettings/>
           </StepContent>
         </Step>
         <Step>
           <StepButton onClick={() => this.setState({stepIndex: 1})} className="stepper">
             {formatMessage(messages.privacy)}
           </StepButton>
           <StepContent>
             <PrivacySettings/>
           </StepContent>
         </Step>
         <Step>
           <StepButton onClick={() => this.setState({stepIndex: 2})} className="stepper">
             {formatMessage(messages.keys)}
           </StepButton>
           <StepContent>
             <KeyList/>
           </StepContent>
         </Step>
       </Stepper>
     </div>
    );
  }
}

SettingsTab.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(muiThemeable()(SettingsTab));
