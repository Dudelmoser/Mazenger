export const CHANGE_RIGHT_TAB = "changeRightTab";

// good example for bloated action syntax
export function changeRightTab(value) {
  return {
    type: CHANGE_RIGHT_TAB,
    value
  }
}
