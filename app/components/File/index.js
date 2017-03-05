import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";

function File(props) {

  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
    padding: 8,
    background: props.muiTheme.message.color,
  };

  return (
    <a
      href={props.url}
      style={linkStyle}>
      <b>{props.name}</b>
    </a>
  );
}

File.propTypes = {
  url: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
};

export default muiThemeable()(File);
