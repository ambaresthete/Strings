/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import Navigator from './navigation/Navigator';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import store from './store';

// Check for token
if (AsyncStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(AsyncStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(AsyncStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}


export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={ store }>
      <Navigator /> 
      </Provider>
    );
  }
}

