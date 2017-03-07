import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectPrimaryIndex, selectPrimaryColors, selectBackgroundIndex, selectBackgroundColors} from "./selectors";
import {FloatingActionButton} from "material-ui";
import {changePrimaryColor, changeBackgroundColor} from "./actions";
import {injectIntl, intlShape} from "react-intl";
import ActionDone from "material-ui/svg-icons/action/done";
import {emphasize} from "material-ui/utils/colorManipulator";

export class SettingsTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  wrapperStyle = {
    padding: "1rem",
  }

  render() {

    const pryStyle = {
      margin: "10px 10px 10px 0",
    };

    const bgStyle = {
      margin: "10px 10px 10px 0",
    };

    return (
     <div style={this.wrapperStyle}>
       Background
       <div>
         {this.props.bgColorList.map((color, idx) => {
           return <FloatingActionButton
             key={idx}
             zDepth={1}
             mini={true}
             style={bgStyle}
             backgroundColor={color}
             onClick={this.props.changeBackgroundColor.bind(this, idx)}>
             {idx == this.props.bgColorIdx ? <ActionDone style={{fill: (emphasize(color, 0.8))}}/> : <div></div>}
           </FloatingActionButton>
         })}
       </div>
       Primary color
       <div>
         {this.props.pryColorList.map((color, idx) => {
           return <FloatingActionButton
             key={idx}
             zDepth={1}
             mini={true}
             style={pryStyle}
             backgroundColor={color}
             onClick={this.props.changePrimaryColor.bind(this, idx)}>
             {idx == this.props.pryColorIdx ? <ActionDone style={{fill: (emphasize(color, 0.8))}}/> : <div></div>}
           </FloatingActionButton>
         })}
       </div>
     </div>
    );
  }
}

SettingsTab.propTypes = {
  intl: intlShape.isRequired,
}

const mapStateToProps = createStructuredSelector({
  pryColorIdx: selectPrimaryIndex(),
  pryColorList: selectPrimaryColors(),
  bgColorIdx: selectBackgroundIndex(),
  bgColorList: selectBackgroundColors(),
});

const mapDispatchToProps = (dispatch) => ({
  changePrimaryColor: (idx) => dispatch(changePrimaryColor(idx)),
  changeBackgroundColor: (idx) => dispatch(changeBackgroundColor(idx)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SettingsTab));
