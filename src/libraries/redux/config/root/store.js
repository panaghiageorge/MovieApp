/* @flow */

import {applyMiddleware, compose, createStore, Store} from 'redux';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../../rootReducer';
import rootSaga from './rootSaga';
import ReactotronWrapper from '../../../reactotron/reactotron';

const middlewares: Array<Object> = [thunk];
const extraMiddlewares: Array<Object> = [];
const sagaOptions = {};

if (__DEV__) {
  middlewares.push(logger);

  ReactotronWrapper.connect();
  extraMiddlewares.push(ReactotronWrapper.get().createEnhancer());
  sagaOptions.sagaMonitor = ReactotronWrapper.get().createSagaMonitor();
} else {
  console.t = {
    log: () => null,
    display: () => null,
    warn: () => null,
    logImportant: () => null,
  };
}

const sagaMiddleware: Object = createSagaMiddleware(sagaOptions);
middlewares.push(sagaMiddleware);

const store: Store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), ...extraMiddlewares),
);

sagaMiddleware.run(rootSaga);

export default store;
