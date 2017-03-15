import React from "react";

function Image(props) {

  const style = {
    display: "inline-block",
    position: "relative",
    left: props.alignRight ? 4 : -4,
    width: props.width || 320,
    height: props.height || 180,
    backgroundImage: `url(${props.url})`,
    backgroundSize: "cover",
    margin: "0 4px 0 4px",
  }

  return (
    <div
      style={style}
      title={props.name}
      onClick={props.onClick ? props.onClick.bind(this, props.id) : ""}
    ></div>
  );
}

Image.propTypes = {
  url: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
  onClick: React.PropTypes.func,
  id: React.PropTypes.string,
  width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  alignRight: React.PropTypes.bool,
};

export default Image;
