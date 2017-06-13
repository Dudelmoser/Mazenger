import React from "react";
import Body from "./Body";
import Attachments from "./Attachments";

/*
 * A message composed of a textual body and a list of attachments rendered according to their type
 * (e.g. links with description, media player objects, ...)
 */
function Message(props) {

  const style = {
    display: "inline-block",
    whiteSpace: "pre-line",
    wordBreak: "break-word",
    overflow: "hidden",
    maxWidth: "592px",
    lineHeight: "32px",
    minHeight: "32px",
    padding: "0.5em",
    alignSelf: props.isOwn ? "flex-end" : "flex-start",
  };

  return (
    <div
      style={style}
      data-tip={props.tooltip}
      data-for={props.isOwn ? "ttleft" : "ttright"}>
      <Body
        body={props.message.get("body")}
      />
      <Attachments
        attachments={props.message.get("attachments")}
        alignRight={props.isOwn}
        onClick={props.onClick}
      />
    </div>
  );
}

Message.propTypes = {
  message: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
  tooltip: React.PropTypes.string,
  isOwn: React.PropTypes.bool,
  bgColor: React.PropTypes.string,
};

export default Message;
