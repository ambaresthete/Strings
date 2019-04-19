
import { View,Text, StyleSheet ,ScrollView,Image } from 'react-native';
import { Container, Content, Icon, Header, Body } from 'native-base';
import React, { Component } from "react";
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import ProfileStack from './Stack/ProfileStack';
import ViewStack from './Stack/ViewStack';
import Search from '../screens/Search';
import Profiles from '../components/profiles/Profiles';
import Profile from '../components/profile/Profile';
import Posts from '../components/posts/Posts';

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


const AppStack = createDrawerNavigator({
  Profiles: {
    screen: ViewStack
  },
  Posts: {
    screen: Posts
  },
  Dashboard:{
    screen: ProfileStack 
  },
},
  {
    initialRouteName: 'Profiles',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
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

export default AppStack;
