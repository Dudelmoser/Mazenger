import React from "react";
import emoji from "react-easy-emoji";
import muiThemeable from "material-ui/styles/muiThemeable";
import {CT_ICON, DSBL_ICON, PK_ICON, SK_ICON} from "../../../containers/KeyManager/constants";
import {URL_REGEX, IMAGE_REGEX, VIDEO_REGEX, AUDIO_REGEX} from "../../utils";
import Link from "../Link";

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

  /*
  File links get removed from the body and added as attachments instead.
  Other links are removed without compensation cause facebook already adds them as attachments.
  Images are wrapped into an image object cause facebook doesn't treat image links like uploaded images.
  */
  let content = "";
  let attachments = [];
  if (msg) {
    const parts = msg.split(/\s+/g);
    for (let i = 0; i < parts.length; i++) {
      if (VIDEO_REGEX.test(parts[i]) || AUDIO_REGEX.test(parts[i])) {
        attachments.push(
          <Link
            key={i}
            url={parts[i]}
          />
        );
      } else if (IMAGE_REGEX.test(parts[i])) {
        attachments.push(
          <a
            key={i}
            href={parts[i]}
            target="_blank"
          >
            <img
              src={parts[i]}
              width="100%"
              height="auto"
            />
          </a>
        );
      } else if (URL_REGEX.test(parts[i])) {
        continue;
      } else {
        content += parts[i];
      }
      content += " ";
    }
  }

  return !content.length ? null : (
    <div>
      <div style={style}>
        {emoji(content)}
      </div>
      <div>
        {attachments}
      </div>
    </div>
  );
}

Body.propTypes = {
  body: React.PropTypes.string
};

export default muiThemeable()(Body);
