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
import {injectGlobal} from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";

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
    this.injectTooltipStyle();
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

  injectTooltipStyle() {
    const color = this.props.muiTheme.palette.textColor;
    const bg = this.props.muiTheme.message.color;
    injectGlobal`
    .tooltip {
        color: ${color} !important;
        height: 30px !important;
        font-size: 1rem !important;
        padding: 4px 16px !important;
        background-color: ${bg} !important;
        border-radius: 0 !important;
      &.place-left {
        &:after {
            border-left-color: ${bg} !important;
          }
        }
      &.place-top {
        &:after {
            border-top-color: ${bg} !important;
          }
        }
      &.place-right {
        &:after {
            border-right-color: ${bg} !important;
          }
        }
      &.place-bottom {
        &:after {
            border-bottom-color: ${bg} !important;
          }
        }
      }
    }`;
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

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(injectIntl(ColorPicker)));
