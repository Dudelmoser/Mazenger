export const CHANGE_MESSAGE = "fb.changeMessage";

export function changeMessage(message) {
  return {
    type: CHANGE_MESSAGE,
    message,
  };
}