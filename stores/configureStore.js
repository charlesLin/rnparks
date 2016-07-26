import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//import rootReducer from '../reducers/parksReducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore(initialState = {}) {

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk, reduxImmutableStateInvariant()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}