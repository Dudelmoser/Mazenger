export const ADD_REGEX = "ChatbotTab.addRegex";
export const DELETE_REGEX = "ChatbotTab.deleteRegex";
export const SET_BOT_STATE = "ChatbotTab.setChatbotState";

export function addRegex(global, regex, res) {
  return {
    type: ADD_REGEX,
    global,
    regex,
    res
  }
}

export function deleteRegex(global, keys) {
  return {
    type: DELETE_REGEX,
    global,
    keys
  }
}

export function setChatbotState(global, enabled) {
  return {
    type: SET_BOT_STATE,
    global,
    enabled
  }
}
