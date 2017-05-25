import {fromJS} from 'immutable';
import {combineReducers} from 'redux-immutable';
import {LOCATION_CHANGE} from 'react-router-redux';
import messengerReducer from "containers/App/reducer";
import languageReducer from 'containers/LanguageProvider/reducer';

/**
 * This file combines all reducers into one main reducer.
 * The extra import is needed to make reducers hot reloadable.
 */

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageReducer,
    messenger: messengerReducer,
    ...asyncReducers,
  });
}
