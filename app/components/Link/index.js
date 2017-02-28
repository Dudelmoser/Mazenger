import React from "react";

function Link(props) {

  const linkStyle = {
    color: "inherit",
    textDecoration: "none"
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

export default Link;