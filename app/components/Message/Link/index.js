import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import {createMediaPlayer} from "../../utils";

/*
 * Minimalist link component.
 */
function Link(props) {

  const style = {
    display: "inline-block",
    padding: 8,
    color: "inherit",
    fontWeight: 300,
    textDecoration: "none",
    background: props.muiTheme.message.color,
  };

  /* Insert link or media player depending on the URL */
  const mediaPlayer = createMediaPlayer(props);
  return mediaPlayer ? mediaPlayer : (
    <a
      target="_blank"
      href={props.url}
      style={style}>
      <strong>{props.title ? props.title : props.url}</strong>
      {props.description ? <p>{props.description}</p> : null}
      {props.source != props.title ? <aside>{props.source}</aside> : null}
    </a>
  );
}

Link.propTypes = {
  url: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  source: React.PropTypes.string,
};

export default muiThemeable()(Link);
