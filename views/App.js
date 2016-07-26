import React, { Component } from 'react';
import { applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as parksActions from '../actions/parksActions';

import * as reducers from '../reducers';
import Layout from './Layout';
import configureStore from '../stores/configureStore';


const reducer = combineReducers(reducers);
//const store = createStoreWithMiddleware(reducer);
const store = configureStore();
store.dispatch(parksActions.loadParks());

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}