export const INSERT_EMOJI = "fb.insertEmoji";
export const OPEN_EMOJI_GROUP = "fb.openEmojiGroup";

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