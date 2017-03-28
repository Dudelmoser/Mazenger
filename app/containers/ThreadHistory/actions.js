export const DELETE_MESSAGES = "deleteSelectMessage";
export const SELECT_ALL_MESSAGES = "selectAllMessages";
export const DESELECT_ALL_MESSAGES = "deselectAllMessages";
export const LOAD_MORE_MESSAGES = "loadMoreMessages";

export function deleteMessages() {
  return {
    type: DELETE_MESSAGES
  }
}

export function selectAllMessages() {
  return {
    type: SELECT_ALL_MESSAGES
  }
}

export function deselectAllMessages() {
  return {
    type: DESELECT_ALL_MESSAGES
  }
}

export function loadMoreMessages() {
  return {
    type: LOAD_MORE_MESSAGES
  }
}
