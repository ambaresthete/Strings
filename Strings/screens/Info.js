import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';


export default class Info extends React.Component {
  render() {
    return (
        
        <Text>Info!</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9C729',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
