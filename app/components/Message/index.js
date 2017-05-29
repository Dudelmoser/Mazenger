import React from "react";
import Body from "./Body";
import Attachments from "./Attachments";

// const entityMap = {
//   '&': '&amp;',
//   '<': '&lt;',
//   '>': '&gt;',
//   '"': '&quot;',
//   "'": '&#39;',
//   '/': '&#x2F;',
//   '`': '&#x60;',
//   '=': '&#x3D;'
// };
//
// function escapeHtml(str) {
//   return String(str).replace(/[&<>"'`=\/]/g, (s) => entityMap[s]);
// }

function Message(props) { // eslint-disable-line react/prefer-stateless-function

  const style = {
    whiteSpace: "pre-line",
    wordBreak: "break-word",
    borderRadius: "4px",
    display: "inline-block",
    maxWidth: "592px",
  };

  // function onMouseEnter(e) {
  //   if (props.message.get("raw"))
  //     e.target.innerHTML = escapeHtml(props.message.get("raw")).replace("\n", "<br>")
  // }
  //
  // function onMouseLeave(e) {
  //   if (props.message.get("raw"))
  //     return e.target.innerHTML = html;
  // }

  return (
    <div
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
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
