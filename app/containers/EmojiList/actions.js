export const INSERT_EMOJI = "EmojiList.insertEmoji";
export const OPEN_EMOJI_GROUP = "EmojiList.openEmojiGroup";

export function insertEmoji(emoji) {
  return {
    type: INSERT_EMOJI,
    emoji
  }
}

export function openEmojiGroup(index) {
  return {
    type: OPEN_EMOJI_GROUP,
    index
  }
}
