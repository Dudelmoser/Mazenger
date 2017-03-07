import {ROOT} from "./constants";
import {fromJS} from "immutable";

const selectRoot = () => state => state ? state.get(ROOT) : fromJS({})

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
  selectLocationState
};
