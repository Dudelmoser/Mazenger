import React from "react";
import {Divider} from "material-ui";
import Image from "../Image";
import File from "../File";
import Link from "../Link";
import emoji from "react-easy-emoji";
import styled from "styled-components";

function Message(props) { // eslint-disable-line react/prefer-stateless-function

  const Spacer = styled.div`height: 12px;`;
  const Spacer2 = styled.div`height: 6px;`;

  // The following measurements are based on two fixed sizes used by Facebook:
  // a) the avatar size, which is always 32x32
  // b) the image thumbnails, which have a shorter side of 280px
  // and the standard display size of 1920x1080,
  // resulting in a thread history width of 1172px.
  // 1 line can contain max. 3 images (including avatar, margins, paddings etc.)
  //
  // maxWidth: 280px * 3 (images) + 8px * 3 (spacing) + 8px * 2 (padding) = 880px
  // maxWidth: 280px * 2 (images) + 8px * 2 (spacing) + 8px * 2 (padding) = 592px

  const squareImgSize = 280;

  const divStyle = {
    whiteSpace: "preline",
    wordBreak: "break-word",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "4px",
    paddingLeft: "8px",
    paddingRight: "8px",
    display: "inline-block",
    maxWidth: "592px",
  };

  function renderAttachment() {
    const attachments = props.message.get("attachments").sortBy(attach => attach.get("type"));
    const imgCount = attachments.filter(attach => attach.get("type") == "photo").count();
    let curImg = 0;

    let components = [];
    attachments.forEach((attachment, i) => {
      switch (attachment.get("type")) {
        case "share":
          components[i] = <Link
            key={i}
            url={attachment.get("facebookUrl")}
            title={attachment.get("title")}
            description={attachment.get("description")}
            source={attachment.get("source")}
          />;
          break;
        case "file":
          components[i] = <File
            key={i}
            url={attachment.get("url")}
            name={attachment.get("name")}
          />;
          break;
        case "photo":
          curImg++;
          if (curImg == 1) {
            components[i] = <Spacer key={i + "a"}/>;
          }
          components[i+1] = <Image
              key={attachment.get("ID")}
              id={attachment.get("ID")}
              url={attachment.get("previewUrl")}
              onClick={props.onClick}
              name={attachment.get("name")}
              width={imgCount == 1 ? attachment.get("previewWidth") : squareImgSize}
              height={imgCount == 1 ? attachment.get("previewHeight") : squareImgSize}
            />
          if (curImg == imgCount) {
            components[i+2] = <Spacer2 key={i + "b"}/>
          }
          break;
      }
    });
    return components.length ? components : null;
  }

  function renderBody() {
    const body = props.message.get("body");
    if (!body)
      return;
    const parts = body.split(" ");
    let res = "";
    for (let part of parts) {
      if (part.startsWith("http://") || part.startsWith("https://")) {
        if(props.message.get("attachments").get(0)) {
          continue;
        } else {
          return <Link url={part} />
        }
      }
      res += part + " ";
    }

    if (res.length > 1) {
      return emoji(res);
    } else {
      return;
    }
  }

  function renderMessage() {
    const attachment = renderAttachment();
    const body = renderBody();
    let divider;
    if (attachment && body) {
      divider = <Divider />
    }

    return (
      <div>
        <div
          data-for={props.isOwn ? "ttleft" : "ttright"}
          data-tip={props.tooltip}
          style={divStyle}>
          {body}
          {divider}
          {attachment}
        </div>
      </div>
    );
  }

  return (
    renderMessage()
  );
}

Message.propTypes = {
  message: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
  tooltip: React.PropTypes.string,
  isOwn: React.PropTypes.bool,
};

export default Message;
