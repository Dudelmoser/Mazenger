import React from "react";
import styled from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";
import Image from "../Image";
import Link from "../Link";
import {IMAGE_REGEX, unwrapFacebookProxyURL} from "../../utils";
import ErrorIcon from "material-ui/svg-icons/alert/error-outline";
import Sticker from "../Sticker";

/*
 * Renders attachments according to their type with fitting components.
 */
function Attachments(props) {

/*
 * The following measurements are based on two fixed sizes used by Facebook:
 * a) the avatar size, which is always 32x32
 * b) the image thumbnails, which have a shorter side of 280px
 * and the standard display size of 1920x1080,
 * resulting in a thread history width of 1172px.
 * One line can contain max. 3 images (including avatar, margins, paddings etc.)
 *
 * maxWidth: 280px * 3 (images) + 8px * 3 (spacing) + 8px * 2 (padding) = 880px
 * maxWidth: 280px * 2 (images) + 8px * 2 (spacing) + 8px * 2 (padding) = 592px
 */

  const squareImgSize = 280;

  const Spacer = styled.div`height: 12px;`;
  const Spacer2 = styled.div`height: 6px;`;

  const attachments = props.attachments.sortBy(attach => attach.get("type"));
  const imgCount = attachments.filter(attach => attach.get("type") === "photo").count();
  let curImg = 0;

  let components = [];
  attachments.forEach((attachment, i) => {
    switch (attachment.get("type")) {

      case "share":
        const url = unwrapFacebookProxyURL(attachment.get("facebookUrl"));
        if (!IMAGE_REGEX.test(url))
          components.push(
            <Link
              key={i}
              url={attachment.get("facebookUrl")}
              title={attachment.get("title")}
              description={attachment.get("description")}
              source={attachment.get("source")}
            />
          );
        break;

      case "video":
        components.push(
          <Link
            key={i}
            url={attachment.get("url")}
            name={attachment.get("filename")}
            type="video"
          />
        );
        break;

      case "file":
        components.push(
          <Link
            key={i}
            url={attachment.get("url")}
            name={attachment.get("name")}
          />
        );
        break;

      case "error":
        components.push(
          <ErrorIcon
            key={i}
            color={props.muiTheme.palette.warningColor}
          />
        );
        break;

      case "sticker":
        components.push(
          <Sticker
            key={i}
            sticker={attachment}
          />
        );
        break;

      /* GIFs */
      case "animated_image":
        components.push(
          <img
            key={i}
            src={attachment.get("previewUrl")}
          />
        );
        break;

      case "photo":
        curImg++;
        if (curImg === 1)
          components.push(<Spacer key={i + "a"}/>);

        components.push(<Image
          key={attachment.get("ID")}
          id={attachment.get("ID")}
          url={attachment.get("previewUrl")}
          onClick={props.onClick}
          name={attachment.get("name")}
          width={imgCount === 1 ? attachment.get("previewWidth") : squareImgSize}
          height={imgCount === 1 ? attachment.get("previewHeight") : squareImgSize}
          alignRight={props.alignRight}
        />);
        if (curImg === imgCount) {
          components.push(<Spacer2 key={i + "b"}/>)
        }
        break;
    }
  });

  return components.length
    ? <div>{components}</div>
    : null;
}

Attachments.propTypes = {
  attachments: React.PropTypes.object.isRequired,
  alignRight: React.PropTypes.bool,
};

export default muiThemeable()(Attachments);
