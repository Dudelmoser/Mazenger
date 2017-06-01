export const CHANGE_LEFT_TAB = "Sidebar.changeLeftTab";
export const CHANGE_RIGHT_TAB = "Sidebar.changeRightTab";

export function changeRightTab(value) {
  return {
    type: CHANGE_RIGHT_TAB,
    value
  }
}

export function changeLeftTab(value) {
  return {
    type: CHANGE_LEFT_TAB,
    value
  }
}
