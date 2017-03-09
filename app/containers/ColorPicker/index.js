import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectAccentKey, selectAccentColors, selectBackgroundKey, selectBackgroundColors} from "./selectors";
import {FloatingActionButton} from "material-ui";
import {changeAccentColor, changeBackgroundColor} from "./actions";
import {injectIntl, intlShape} from "react-intl";
import ActionDone from "material-ui/svg-icons/action/done";
import {emphasize} from "material-ui/utils/colorManipulator";
import messages from "./messages";

export class ColorPicker extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  btnStyle = {
    margin: "12px",
  }

  paletteStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem",
    marginLeft: "-12px",
    marginRight: "-12px",
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
     <div>
       <h5>{formatMessage(messages.bgColors)}</h5>
       <div style={this.paletteStyle}>
         {this.props.backgroundColors.map((color, key) => {
           return <FloatingActionButton
             key={key}
             zDepth={1}
             mini={true}
             style={this.btnStyle}
             backgroundColor={color}
             onClick={this.props.changeBackgroundColor.bind(this, key)}>
             {key == this.props.backgroundKey ? <ActionDone style={{fill: (emphasize(color, 0.8))}}/> : <div></div>}
           </FloatingActionButton>
         })}
       </div>
       <h5>{formatMessage(messages.accentColors)}</h5>
       <div style={this.paletteStyle}>
         {this.props.accentColors.map((color, key) => {
           return <FloatingActionButton
             key={key}
             zDepth={1}
             mini={true}
             style={this.btnStyle}
             backgroundColor={color}
             onClick={this.props.changeAccentColor.bind(this, key)}>
             {key == this.props.accentKey ? <ActionDone style={{fill: (emphasize(color, 0.8))}}/> : <div></div>}
           </FloatingActionButton>
         })}
       </div>
     </div>
    );
  }
}

ColorPicker.propTypes = {
  intl: intlShape.isRequired,
}

const mapStateToProps = createStructuredSelector({
  accentKey: selectAccentKey(),
  accentColors: selectAccentColors(),
  backgroundKey: selectBackgroundKey(),
  backgroundColors: selectBackgroundColors(),
});

const mapDispatchToProps = (dispatch) => ({
  changeAccentColor: (key) => dispatch(changeAccentColor(key)),
  changeBackgroundColor: (key) => dispatch(changeBackgroundColor(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ColorPicker));
