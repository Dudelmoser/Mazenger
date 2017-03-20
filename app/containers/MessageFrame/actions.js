export const TOGGLE_MESSAGE_SELECT = "toggleMessageSelect";

export function toggleMessageSelect(index, threadID) {
  return {
    type: TOGGLE_MESSAGE_SELECT,
    index,
    threadID
  }
}
