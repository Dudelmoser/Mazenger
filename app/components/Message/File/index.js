import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import {createMediaPlayer} from "../../MediaPlayer/factory";

/*
 * A minimalist file component.
 */
function File(props) {

  const style = {
    color: "inherit",
    textDecoration: "none",
    padding: 8,
    background: props.muiTheme.message.color,
  };

  /* Create a media player or common download link depending on the file ending. */
  const mediaPlayer = createMediaPlayer(props);
  return mediaPlayer ? mediaPlayer : (
    <a
      href={props.url}
      style={style}>
      <b>{props.name}</b>
    </a>
  );
}

File.propTypes = {
  url: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
};

export default muiThemeable()(File);
