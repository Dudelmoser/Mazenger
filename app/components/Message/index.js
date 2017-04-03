import React from "react";
import Body from "./Body";
import Attachments from "./Attachments";

function Message(props) { // eslint-disable-line react/prefer-stateless-function

  const style = {
    whiteSpace: "preline",
    wordBreak: "break-word",
    borderRadius: "4px",
    display: "inline-block",
    maxWidth: "592px",
  };

  return (
    <div>
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
        />
      </div>
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
