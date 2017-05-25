import { getAsyncInjectors } from 'utils/asyncInjectors';

/**
 * This file contains all the relative paths.
 */

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'messenger',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/App/reducer'),
        import('containers/App/sagas'),
        import('containers/App'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          // injectReducer('messenger', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
