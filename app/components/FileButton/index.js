import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import {RaisedButton} from "material-ui";

function FileButton(props) {
  return (
      <RaisedButton
        primary={true}
        label={props.label}
        icon={props.icon}
        style={props.style}
        containerElement="label">
        <input
          type="file"
          accept={props.accept || "*"}
          style={{display: "none"}}
          onChange={props.onSelect.bind(this)}
        />
      </RaisedButton>
  );
}

FileButton.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  accept: React.PropTypes.string,
  label: React.PropTypes.string,
  icon: React.PropTypes.node,
  style: React.PropTypes.object,
};

export default muiThemeable()(FileButton);
