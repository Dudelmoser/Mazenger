import React from "react";
import emoji from "react-easy-emoji";
import muiThemeable from "material-ui/styles/muiThemeable";
import Link from "../Link";

function Body(props) {

  const style = {
    display: "inline-block",
    paddingLeft: 8,
    paddingRight: 8,
    background: props.muiTheme.message.color,
  };

  let attachments = [];
  let message = "";
  let key = 0;
  if (props.body) {
    const parts = props.body.split(" ");
    for (let part of parts) {
      const urlRegex = /@^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$@iS/i;
      if (part.match(urlRegex)) {
        attachments.push(
          <Link key={key++} url={part}/>
        );
      }
      message += part + " ";
    }

    if (message.length > 0)
      message = emoji(message);
  }

  return (
    <div>
      <span style={style}>{message}</span>
      {attachments}
    </div>
  );
}

Body.propTypes = {
  body: React.PropTypes.string.isRequired,
};

export default muiThemeable()(Body);
