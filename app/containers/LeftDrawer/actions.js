export const CHANGE_LEFT_TAB = "changeLeftTab";

// good example for bloated action syntax
export function changeLeftTab(value) {
  return {
    type: CHANGE_LEFT_TAB,
    value
  }
}
