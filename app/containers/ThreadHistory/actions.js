export const DELETE_MESSAGES = "ThreadHistory.deleteSelectMessage";
export const SELECT_ALL_MESSAGES = "ThreadHistory.selectAllMessages";
export const DESELECT_ALL_MESSAGES = "ThreadHistory.deselectAllMessages";
export const LOAD_MORE_MESSAGES = "ThreadHistory.loadMoreMessages";
export const CLOSE_PHOTO_VIEWER = "ThreadHistory.closePhotoViewer";

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

export function closePhotoViewer() {
  return {
    type: CLOSE_PHOTO_VIEWER
  }
}
