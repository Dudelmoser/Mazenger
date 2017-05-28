import React from "react";

import {RaisedButton, FlatButton, TextField, SelectField, MenuItem} from "material-ui";
import muiThemeable from "material-ui/styles/muiThemeable";
import {createStructuredSelector} from "reselect";
import {pickMeme, setTopCaption, setBottomCaption, sendMeme} from "./actions";
import {connect} from "react-redux";
import {injectIntl, intlShape} from "react-intl";
import {selectTop100Memes, selectCurrentMeme, selectBottomCaption, selectTopCaption, selectCustomMemes,
  selectFavoriteMemes, selectActiveCategory
} from "./selectors";
import messages from "./messages";
import {sendMessage, uploadImage} from "../App/actions/requests";
import {selectCurrentThreadID} from "../LoginModal/selectors";
import AddIcon from "material-ui/svg-icons/content/add";
import {FAVORITE_MEMES, CUSTOM_MEMES, TOP100_MEMES} from "./constants";


export class MemeGenerator extends React.Component {

  styles = {
    container: {
      margin: "0 16px",
    },
    canvas: {
      display: "block",
      maxWidth: "100%",
      maxHeight: "448px",
      marginBottom: "16px",
    },
  }

  loadImage(event) {
    let that = this;
    let reader = new FileReader();
    reader.onload = function (evt) {
      that.props.addMeme(evt.target.result);
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  render() {

    const styles = {
      button: {
        marginTop: 28,
        minWidth: 44,
        marginBottom: 8,
        verticalAlign: "middle",
        borderRadius: 0,
        borderBottom: "1px solid " + this.props.muiTheme.palette.borderColor,
      },
      icon: {
        color: this.props.muiTheme.palette.borderColor,
      }
    }

    const {formatMessage} = this.props.intl;
    return (
    <div style={this.styles.container}>
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
        onChange={this.props.pickMeme.bind(this, TOP100_MEMES)}
        value={this.props.activeCat == TOP100_MEMES ? this.props.current.get("url") : null}>
        {this.props.top100.map((meme, key) =>
          <MenuItem key={key} value={meme.get("url")} primaryText={meme.get("name")}/>
        )}
      </SelectField>

      <div>
        <SelectField
          style={{width: "calc(100% - 44px)", verticalAlign: "middle"}}
          fullWidth={true}
          floatingLabelText={formatMessage(messages.custom)}
          onChange={this.props.pickMeme.bind(this, CUSTOM_MEMES)}
          value={this.props.activeCat == CUSTOM_MEMES ? this.props.current.get("url") : null}>
          {this.props.custom.map((meme, key) =>
            <MenuItem key={key} value={meme.get("url")} primaryText={formatMessage(messages.customPrefix) + meme.get("name")}/>
          )}
        </SelectField>
        <FlatButton
          style={styles.button}
          primary={true}
          containerElement="label">
          <AddIcon style={styles.icon}/>
          <input
            type="file"
            accept="image/*"
            style={{display: "none"}}
            onChange={this.loadImage.bind(this)}
          />
        </FlatButton>
      </div>

      <SelectField
        fullWidth={true}
        floatingLabelText={formatMessage(messages.favorites)}
        onChange={this.props.pickMeme.bind(this, FAVORITE_MEMES)}
        value={this.props.activeCat == FAVORITE_MEMES ? this.props.current.get("url") : null}>
        {this.props.faves.map((meme, key) =>
          <MenuItem key={key} value={meme.get("url")} primaryText={meme.get("name")}/>
        )}
      </SelectField>

      <div style={{textAlign: "center"}}>
        <canvas
          id="memeCanvas"
          style={this.styles.canvas}>
        </canvas>
        <RaisedButton
          label="Send meme"
          primary={true}
          onClick={this.props.sendMeme}
        />
      </div>
    </div>
    );
  }
}

MemeGenerator.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  threadID: selectCurrentThreadID(),
  top100: selectTop100Memes(),
  custom: selectCustomMemes(),
  faves: selectFavoriteMemes(),
  current: selectCurrentMeme(),
  topCaption: selectTopCaption(),
  bottomCaption: selectBottomCaption(),
  activeCat: selectActiveCategory(),
});

const mergeProps = (stateProps, {dispatch}) => {
  return {
    ...stateProps,  // unwraps the stateProps
    addMeme: (url) => dispatch(uploadImage(url)),
    pickMeme: (cat, evt, idx, url) => dispatch(pickMeme(cat, idx, url)),
    setTopCaption: (evt) => dispatch(setTopCaption(evt.target.value)),
    setBottomCaption: (evt) => dispatch(setBottomCaption(evt.target.value)),

    sendMeme: () => {
      const dataURL = document.getElementById("memeCanvas").toDataURL();
      dispatch(sendMessage(stateProps.threadID, "", dataURL));
      dispatch(sendMeme());
    }
  }
};

export default connect(mapStateToProps, null, mergeProps)(muiThemeable()(injectIntl(MemeGenerator)));
