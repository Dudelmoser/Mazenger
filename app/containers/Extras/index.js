import React from "react";
import {injectIntl, intlShape} from "react-intl";
import ThemeSettings from "../ThemeSettings";
import PrivacySettings from "../PrivacyManager";
import {Stepper, Step, StepButton, StepContent} from "material-ui";
import {injectGlobal} from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";
import messages from "./messages";
import KeyList from "../KeyManager";

/*
A wrapper that packs all tools and settings listed under 'categories' into one stepper.
*/
export class Extras extends React.PureComponent {

  /* Add new categories here and their title inside the messages file. */
  categories = [{
    id: messages.theme,
    container: <ThemeSettings/>
  }, {
    id: messages.privacy,
    container: <PrivacySettings/>
  }, {
    id: messages.keys,
    container: <KeyList/>
  }];

  state = {
    stepIndex: 0,
  };

  style = {
    padding: "0 1rem 0 0",
  };

  render() {

    /* Inject a fill color based on the current theme into the stepper svg circles. */
    injectGlobal`
      .stepper>div span>span>svg>text {
        fill: ${this.props.muiTheme.palette.alternateTextColor};
      }
    `;

    const {formatMessage} = this.props.intl;

    return (
     <div style={this.style}>
       <Stepper
         linear={false}
         activeStep={this.state.stepIndex}
         orientation="vertical">
         {this.categories.map((cat, index) =>
           <Step key={index}>
             <StepButton onClick={() => this.setState({stepIndex: index})} className="stepper">
               {formatMessage(cat.id)}
             </StepButton>
             <StepContent>
                {cat.container}
             </StepContent>
           </Step>
         )}
       </Stepper>
     </div>
    );
  }
}

Extras.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(muiThemeable()(Extras));
