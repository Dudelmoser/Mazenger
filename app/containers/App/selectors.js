import {ROOT, SOCKET, SESSIONS} from "./constants";
import {fromJS} from "immutable";
import {createSelector} from "reselect";

const selectRoot = () => state => state ? state.get(ROOT) : fromJS({})

const selectIsConnected = () => createSelector(
  selectRoot(),
  (root) => root.get(SOCKET)
);

const selectSessions = () => createSelector(
  selectRoot(),
  (root) => root.get(SESSIONS)
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectRoot,
  selectSessions,
  selectIsConnected,
  selectLocationState
};
