import React, { Component } from "react";
import AuthLoading from './AuthLoading';
import AppStack from './DrawerNavigator';
import AuthStack from './Stack/StackNavigator';

import {  createAppContainer,  createSwitchNavigator } from 'react-navigation';







const Navigator =  createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default Navigator;