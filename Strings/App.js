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
import {setCurrentUser,logoutUser} from './actions/authActions';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';
import { View,Text } from 'react-native';

const { persistor, store } = configureStore();



export default class App extends React.Component {

  constructor(){
    super();
    console.disableYellowBox = true;
  }

  render() {
    return (
     
<StoreProvider store={store}>
<PersistGate loading={null} persistor={persistor}>
<PaperProvider>
<Navigator /> 
</PaperProvider>
</PersistGate>
</StoreProvider>
      
    );
  }
}

