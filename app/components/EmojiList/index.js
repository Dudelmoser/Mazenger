import React from "react";
import emoji from "react-easy-emoji";

function EmojiList(props) {

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "1em"
  };

  const emojiStyle = {
    width: "2em",
    height: "2em"
  }

  return (
    <div
      style={containerStyle}>
      {props.emojis.map((char, key) =>
        <div
          key={key}
          style={emojiStyle}
          onTouchTap={props.onClick}>{emoji(char)}
        </div>
      )}
    </div>
  );
}

EmojiList.propTypes = {
  emojis: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func,
  nestedLevel: React.PropTypes.number,
}

export default EmojiList;