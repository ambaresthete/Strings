import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class Test extends React.Component {
  render() {
    return (
        <TextField
        label='Phone number'
        value="yo"
      />
        
    );
  }
}


