import {ROOT, SOCKET, SESSIONS, GUI} from "./constants";
import {Map} from "immutable";
import {createSelector} from "reselect";

export const selectRoot = () => state => state ? state.get(ROOT) : Map();

export const selectSessions = () => createSelector(
  selectRoot(),
  (root) => root.get(SESSIONS)
);

export const selectIsConnected = () => createSelector(
  selectRoot(),
  (root) => root.get(SOCKET)
);

export const selectGUI = () => createSelector(
  selectRoot(),
  (root) => root.get(GUI) || Map()
);

export const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get("route");

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};
