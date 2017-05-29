import React from "react";

/*
 * An image component specialized on rendering facebook image thumbnails
 * and cropping them for multi-image grids if necessary.
 */
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
  };

  return (
    <div
     style={style}
     title={props.name}
     onClick={props.onClick ? props.onClick.bind(this, props.id) : ""}
    />
  );
}

Image.propTypes = {
  url: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  onClick: React.PropTypes.func,
  alignRight: React.PropTypes.bool,
  width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
};

export default Image;
