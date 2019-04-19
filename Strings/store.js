import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {persistStore, persistCombineReducers} from "redux-persist";
import { AsyncStorage } from 'react-native';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const initialState = {};

const enhancers= [];
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
  stateReconciler: hardSet
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

// eslint-disable-next-line no-underscore-dangle
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default () => {
  const store = createStore(persistedReducer, initialState, composedEnhancers);
  return { store, persistor: persistStore(store) };
};

