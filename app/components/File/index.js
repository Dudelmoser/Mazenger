import React from "react";

function File(props) {

  const linkStyle = {
    color: "inherit",
    textDecoration: "none"
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

export default File;