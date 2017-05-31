export const ADD_REGEX = "AutoResponder.addRegex";
export const DELETE_REGEX = "AutoResponder.deleteRegex";
export const SET_RESPONDER_STATE = "AutoResponder.setResponderState";

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

export function setResponderState(global, enabled) {
  return {
    type: SET_RESPONDER_STATE,
    global,
    enabled
  }
}
