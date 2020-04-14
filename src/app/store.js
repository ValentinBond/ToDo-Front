import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import allReducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default createStore(combineReducers({
  ...allReducers
}), composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);