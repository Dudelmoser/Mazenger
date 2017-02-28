import React from "react";

import {RaisedButton, TextField, SelectField, MenuItem} from "material-ui";
import {createStructuredSelector} from "reselect";
import {addMeme, pickMeme, setTopCaption, setBottomCaption, renderMeme} from "./actions";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {darkPalette} from "../App/themes";
import {selectTop100Memes, selectCurrentMeme, selectBottomCaption, selectTopCaption, selectLocalMemes,
  selectFavoriteMemes
} from "./selectors";


export class MemeGenerator extends React.Component {

  componentDidUpdate() {
    this.props.renderMeme();
  }

  render() {
    return (
    <div style={{margin: "0 16px"}}>
      <TextField
        value={this.props.topCaption}
        onChange={this.props.setTopCaption.bind(this)}
        fullWidth={true}
        hintText="Top caption"
        floatingLabelText="Top caption"/>
      <TextField
        value={this.props.bottomCaption}
        onChange={this.props.setBottomCaption.bind(this)}
        fullWidth={true}
        hintText="Bottom caption"
        floatingLabelText="Bottom caption"/>
      <SelectField
        fullWidth={true}
        floatingLabelText="Top100"
        onChange={this.props.pickMeme}
        value={this.props.current}>
        {this.props.top100.map((meme, key) =>
          <MenuItem key={key} value={meme.url} primaryText={meme.name}/>
        )}
      </SelectField>
      <SelectField
        fullWidth={true}
        floatingLabelText="Local"
        onChange={this.props.pickMeme}
        value={this.props.current}>
        {this.props.local.map((meme, key) =>
          <MenuItem key={key} value={meme.url} primaryText={meme.name}/>
        )}
      </SelectField>
      <canvas
        id="memeCanvas"
        style={{border: "1px solid " + darkPalette.borderColor, width: "100%"}}>
      </canvas>
      <div>
        <RaisedButton
          label="Use custom background"
          primary={true}
          containerElement="label">
          <input type="file" style={{display: "none"}}/>
        </RaisedButton>
      </div>
    </div>
    );
  }
}

MemeGenerator.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  top100: selectTop100Memes(),
  local: selectLocalMemes(),
  faves: selectFavoriteMemes(),
  current: selectCurrentMeme(),
  topCaption: selectTopCaption(),
  bottomCaption: selectBottomCaption(),
});

const mapDispatchToProps = (dispatch) => ({
  addMeme: () => dispatch(addMeme()),
  renderMeme: () => dispatch(renderMeme()),
  pickMeme: (evt, idx, val) => dispatch(pickMeme(val)),
  setTopCaption: (evt) => dispatch(setTopCaption(evt.target.value)),
  setBottomCaption: (evt) => dispatch(setBottomCaption(evt.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MemeGenerator));
