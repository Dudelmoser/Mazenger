import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";

function Link(props) {

  const linkStyle = {
    display: "inline-block",
    padding: 8,
    color: "inherit",
    fontWeight: 300,
    textDecoration: "none",
    background: props.muiTheme.message.color,
  };

  return (
    <a
      target="_blank"
      href={props.url}
      style={linkStyle}>
      <strong>{props.title ? props.title : props.url}</strong>
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
