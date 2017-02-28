import React from "react";
import {ListItem} from "material-ui";
import EmojiList from "../EmojiList";

function EmojiCategory(props) {
  return (
    <ListItem
      initiallyOpen={props.open}
      primaryText={props.name}
      leftIcon={props.icon}
      primaryTogglesNestedList={true}
      onClick={props.onOpen ? props.onOpen.bind(this, props.id) : undefined}
      nestedItems={[
        <EmojiList
          emojis={props.emojis}
          onClick={props.onClick}
          nestedLevel={2}
          key={props.name}
        />
      ]}
    />
  );
}

EmojiCategory.propTypes = {
  name: React.PropTypes.string.isRequired,
  icon: React.PropTypes.element.isRequired,
  emojis: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func,
  open: React.PropTypes.bool,
  onOpen: React.PropTypes.func,
}

export default EmojiCategory;