import {getAsyncInjectors} from "utils/asyncInjectors";

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const {injectReducer, injectSagas} = getAsyncInjectors(store);

  // the messenger reducer is loaded synchronously inside the main reducer
  // rather than asynchronously via import to avoid issues with HMR and redux-persist
  return [
    {
      path: "/",
      name: "messenger",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          // import("containers/App/reducer"),
          import("containers/App/sagas"),
          import("containers/App"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([/*reducer, */sagas, component]) => {
          // injectReducer("messenger", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: "*",
      name: "notfound",
      getComponent(nextState, cb) {
        import("containers/NotFoundPage")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}

// error logging helper function
const errorLoading = (err) => {
  console.error("Dynamic page loading failed", err);
};

// module loading helper function
const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};
