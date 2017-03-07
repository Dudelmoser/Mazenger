import {CHANGE_PRIMARY_COLOR, PRIMARY_COLOR, CHANGE_BACKGROUND_COLOR, BACKGROUND_COLOR} from "./constants";
export default function (state, action, curUserID, curThreadID) {
  switch (action.type) {
    case CHANGE_PRIMARY_COLOR:
      return state
        .setIn([curUserID, PRIMARY_COLOR], action.idx);
    case CHANGE_BACKGROUND_COLOR:
      return state
        .setIn([curUserID, BACKGROUND_COLOR], action.idx);
  }
}
