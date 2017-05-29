import React from "react";
import emoji from "react-easy-emoji";
import muiThemeable from "material-ui/styles/muiThemeable";
import Link from "../Link";
import {CT_ICON, DSBL_ICON, PK_ICON, SK_ICON} from "../../../containers/KeyList/constants";

/*
 * A smart message body component that treats links and computer generated content appropriately.
 */
function Body(props) {

  let msg = props.body;

  /* Recognize computer generated meta messages used for encryption and style them appropriately. */
  const isMeta = msg.startsWith(PK_ICON) || msg.startsWith(SK_ICON) || msg.startsWith(CT_ICON) || msg.startsWith(DSBL_ICON);

  const style = {
    display: "inline-block",
    paddingLeft: 8,
    paddingRight: 8,
    background: isMeta ? "transparent" : props.muiTheme.message.color,
    color: isMeta ? props.muiTheme.palette.secondaryTextColor : props.muiTheme.palette.textColor
  };

  /* Extract links using a URL regex. */
  const urlRegex = /@^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$@iS/i;
  let attachments = [];
  if (msg) {
    const parts = msg.split(/\s+/g);
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].match(urlRegex))
        attachments.push(<Link key={i} url={parts[i]}/>);
    }
  }

  /* Split message into single line blocks to render linebreaks properly. */
  return (
    <div>
      <span style={style}>{
        msg.length === 0 ? <div/> : msg.split("\n").map((line, key) =>
          <div key={key}>{line.length > 0 ? emoji(line) : <br/>}</div>
        )
      }</span>
      {attachments}
    </div>
  );
}

Body.propTypes = {
  body: React.PropTypes.string,
};

export default muiThemeable()(Body);
