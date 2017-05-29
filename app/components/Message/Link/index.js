import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import MediaPlayer from "../Media/index";

function Link(props) {

  const url = props.url
    .replace("https://l.facebook.com/l.php?u=", "")
    .replace("%3A", ":").replace("%2F%2F", "//").replace("%2F", "/").replace("%3F", "?").replace("%3D", "=");

  const startsWith = "^https?:\/\/(www.youtube.com\/watch?v=|soundcloud.com|www.facebook.com\/facebook\/videos|" +
    "www.faebook.com\/FacebookDevelopers\/videos|vimeo.com|streamable.com|vid.me|home.wistia.com/medias|www.dailymotion.com/video)*";

  const endsWith = "*.ogg|.mp3|.mp4|.ogv|.webm|.m3u8|.mpd$";

  const linkStyle = {
    display: "inline-block",
    padding: 8,
    color: "inherit",
    fontWeight: 300,
    textDecoration: "none",
    background: props.muiTheme.message.color,
  };

  return (
    url.match(new RegExp(startsWith, "i")) || props.url.match(new RegExp(endsWith, "i")) ?
      <MediaPlayer url={url}/> :
    <a
      target="_blank"
      href={url}
      style={linkStyle}>
      <strong>{props.title ? props.title : url}</strong>
      {props.description ? <p>{props.description}</p> : null}
      <aside>{props.source}</aside>
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
