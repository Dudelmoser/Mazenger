export const CHANGE_MESSAGE = "changeMessage";

export function changeMessage(message) {
  return {
    type: CHANGE_MESSAGE,
    message,
  };
}
