import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.tabStyle}>
        <Text>Solo</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.tabStyle}>
        <Text>Bands</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

const TabNavigator = createMaterialTopTabNavigator({
  Solo: HomeScreen,
  Bands: SettingsScreen,
}
);


export default createAppContainer(TabNavigator);