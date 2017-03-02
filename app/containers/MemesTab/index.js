import React from "react";

import {RaisedButton, FlatButton, TextField, SelectField, MenuItem} from "material-ui";
import muiThemeable from "material-ui/styles/muiThemeable";
import {createStructuredSelector} from "reselect";
import {addMeme, pickMeme, setTopCaption, setBottomCaption, renderMeme} from "./actions";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {darkPalette} from "../App/themes";
import {selectTop100Memes, selectCurrentMeme, selectBottomCaption, selectTopCaption, selectLocalMemes,
  selectFavoriteMemes
} from "./selectors";
import messages from "./messages";


export class MemeGenerator extends React.Component {

  // loadImage(event) {
  //   console.log(this.images);
  //   let that = this;
  //   let reader = new FileReader();
  //   reader.onload = function (evt) {
  //     const url = URL.createObjectURL()
  //     that.props.pickMeme(evt.target.result);
  //   }
  //   reader.readAsDataURL(event.target.files[0]);
  // }

  loadImage(event) {
    let that = this;
    const URL = window.URL;
    const url = URL.createObjectURL(event.target.files[0]);
    that.props.addMeme(url);
  }

  render() {
    const {formatMessage} = this.props.intl;
    return (
    <div style={{margin: "0 16px"}}>
      <TextField
        value={this.props.topCaption}
        onChange={this.props.setTopCaption.bind(this)}
        fullWidth={true}
        hintText={formatMessage(messages.topCaption)}
        floatingLabelText={formatMessage(messages.topCaption)}/>
      <TextField
        value={this.props.bottomCaption}
        onChange={this.props.setBottomCaption.bind(this)}
        fullWidth={true}
        hintText={formatMessage(messages.bottomCaption)}
        floatingLabelText={formatMessage(messages.bottomCaption)}/>
      <SelectField
        fullWidth={true}
        floatingLabelText={formatMessage(messages.top100)}
        onChange={this.props.pickMeme}
        value={this.props.current}>
        {this.props.top100.map((meme, key) =>
          <MenuItem key={key} value={meme.url} primaryText={meme.name}/>
        )}
      </SelectField>
      <div>
        <SelectField
          fullWidth={false}
          floatingLabelText={formatMessage(messages.local)}
          onChange={this.props.pickMeme}
          value={this.props.current}>
          {this.props.local.map((meme, key) =>
            <MenuItem key={key} value={meme.url} primaryText={meme.name}/>
          )}
        </SelectField>
        <RaisedButton
          style={{float: "right", marginTop: "28px"}}
          label="Local image"
          primary={true}
          containerElement="label">
          <input
            type="file"
            accept="image/*"
            style={{display: "none"}}
            onChange={this.loadImage.bind(this)}
          />
        </RaisedButton>
      </div>
      <div>
      <canvas
        id="memeCanvas"
        style={{border: "1px solid " + darkPalette.borderColor, width: "100%"}}>
      </canvas>
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
  addMeme: (url) => dispatch(addMeme(url)),
  pickMeme: (evt, idx, val) => dispatch(pickMeme(val)),
  setTopCaption: (evt) => dispatch(setTopCaption(evt.target.value)),
  setBottomCaption: (evt) => dispatch(setBottomCaption(evt.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(injectIntl(MemeGenerator)));
