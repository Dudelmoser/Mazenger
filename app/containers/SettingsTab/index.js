import React from "react";
import {injectIntl, intlShape} from "react-intl";
import ColorPicker from "../ColorPicker";
import PrivacySettings from "../PrivacySettings";
import {Stepper, Step, StepButton, StepContent} from "material-ui";
import {injectGlobal} from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";
import messages from "./messages";

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
              <ColorPicker/>
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
       </Stepper>
     </div>
    );
  }
}

SettingsTab.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(muiThemeable()(SettingsTab));
