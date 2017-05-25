import {fromJS} from "immutable";
import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import {routerMiddleware} from "react-router-redux";
import {autoRehydrate, persistStore} from "redux-persist-immutable";
import createReducer from "./reducers";

export default function configureStore(initialState = {}, history) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  // add redux-persist as enhancer
  const enhancers = [
    autoRehydrate(),
    applyMiddleware(...middlewares),
  ];

  // use the Redux DevTools composer if available or otherwise the native Redux composer
  // both allow time travelling, but the DevTools visually as a browser extension
  const composeEnhancers =
    process.env.NODE_ENV !== "production"
    && typeof window === "object"
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  // create store from reducer
  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // begin periodically persisting the store
  persistStore(store);

  // register store extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};

  // make reducers hot reloadable
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      import("./reducers").then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);
        store.replaceReducer(nextReducers);
      });
    });
  }

  // make store visible for debugging
  window.store = store;

  return store;
}
