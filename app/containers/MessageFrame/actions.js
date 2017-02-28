export const MESSAGE_SELECTED = "fb.messageSelected";

export function messageSelected(index, threadID) {
  return {
    type: MESSAGE_SELECTED,
    index,
    threadID
  }
}