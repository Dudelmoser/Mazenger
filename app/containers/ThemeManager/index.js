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

/*
 A tool to create themes from a select range of background and accent colors.
 */
export class ThemeManager extends React.PureComponent {

  styles = {
    btn: {
      margin: "12px",
    },
    palette: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "2rem",
      marginLeft: "-12px",
      marginRight: "-12px",
    },
  };

  render() {
    this.injectTooltipStyle();
    const {formatMessage} = this.props.intl;

    return (
      <div>
        <h5>{formatMessage(messages.bgColors)}</h5>
        <div style={this.styles.palette}>
          {this.props.backgroundColors.map((color, key) => {
            return <FloatingActionButton
              key={key}
              zDepth={1}
              mini={true}
              style={this.styles.btn}
              backgroundColor={color}
              onClick={this.props.changeBackgroundColor.bind(this, key)}>
              {
                key === this.props.backgroundKey
                  ? <ActionDone style={{fill: (emphasize(color, 0.8))}}/>
                  : <div/>
              }
            </FloatingActionButton>
          })}
        </div>
        <h5>{formatMessage(messages.accentColors)}</h5>
        <div style={this.styles.palette}>
          {this.props.accentColors.map((color, key) => {
            return <FloatingActionButton
              key={key}
              zDepth={1}
              mini={true}
              style={this.styles.btn}
              backgroundColor={color}
              onClick={this.props.changeAccentColor.bind(this, key)}>
              {
                key === this.props.accentKey
                  ? <ActionDone style={{fill: (emphasize(color, 0.8))}}/>
                  : <div/>
              }
            </FloatingActionButton>
          })}
        </div>
      </div>
    );
  }

  injectTooltipStyle() {
    const color = this.props.muiTheme.palette.textColor;
    const bg = this.props.muiTheme.message.color;
    /*
    A way to style a component that doesn't have sufficient styling attributes without using a monolith css file.
    The SCSS template string is passed to the tag function for substitution and injection.
    &.place-left is equal to .tooltip.place-left, meaning it concatenates the parent with the sub class.
    */
    //language=SCSS
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
    }`;
  }
}

ThemeManager.propTypes = {
  intl: intlShape.isRequired,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(injectIntl(ThemeManager)));
