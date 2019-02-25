import Home from '../screens/Home';
import Join from '../screens/Join';
import Search from '../screens/Search';
import Register from '../components/Register';
import Register2 from '../components/Register2';
import Login from '../components/Login';
import Logout from '../components/Logout';
import { View,Text, StyleSheet ,ScrollView,Image } from 'react-native';
import { Container, Content, Icon, Header, Body } from 'native-base';
import React, { Component } from "react";


import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';



const AuthStack = createStackNavigator({
  Search: {
    screen: Search
  }
}, {
  headerMode: 'none'
});

const CustomDrawerContentComponent = (props) => (

  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image
          style={styles.drawerImage}
          source={require('../assets/home.jpg')} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);


const MyDrawerNavigator = createDrawerNavigator({
  Nest1: {
    screen: AuthStack,
  },
  Logout:{
    screen: Logout
  }
},
  {
    initialRouteName: 'Nest1',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  });

const DrawerNavigator = createAppContainer(MyDrawerNavigator);
const AuthNavigator = createAppContainer(AuthStack);

const Stack = createStackNavigator({
  Home: {
    screen: Home
  },
  Join: {
    screen: Join
  },
  Register: {
    screen: Register
  },
  Register2: {
    screen: Register2
  },
  Login: {
    screen: Login
  },
  Drawer: {
    screen: MyDrawerNavigator
  }
}, {
  headerMode: 'none'
});


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }

});


const Navigator = createAppContainer(Stack);


export default Navigator;

